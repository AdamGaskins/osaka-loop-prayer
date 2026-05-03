#!/usr/bin/env npx tsx

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { argv, exit } from 'node:process'
import { extname, join } from 'node:path'
import yaml, { Type } from 'js-yaml'
import ExcelJS from 'exceljs'

if (argv.length < 4 || ['to_xlsx', 'to_yaml'].indexOf(argv[2]) === -1) {
    console.log('Usage: data_convert [to_xlsx|to_yaml] <xlsx path>')
    exit(1)
}

const excelPath = argv[3]

function json_to_excel(json: JsonData) {
    const rows: (string | number)[][] = [
        ['name', json.name],
        ['kanji', json.name_kanji],
        ['number', json.number],
        ['description', json.description],
        ['song', json.song],
        [],
    ]

    for (let i = 0; i < Math.max(3, json.verses.length); i++) {
        rows.push(['verse', json.verses[i]?.text, json.verses[i]?.ref])
    }

    rows.push([])

    for (let i = 0; i < Math.max(3, json.prayer_points.length); i++) {
        rows.push(['prayer', json.prayer_points[i]])
    }

    return rows
}

function excel_to_json(worksheet: ExcelJS.Worksheet): JsonData {
    const data: JsonData = {
        number: -1,
        name: '',
        name_kanji: '',
        description: '',
        song: '',
        verses: [],
        prayer_points: [],
    }

    function getValue(cell: ExcelJS.Cell) {
        return cell.text.trim()
    }

    worksheet.eachRow((row) => {
        const type = getValue(row.getCell(1))
        const value = getValue(row.getCell(2))

        if (type === 'number') data.number = parseInt(value)
        if (type === 'name') data.name = value
        if (type === 'kanji') data.name_kanji = value
        if (type === 'description') data.description = value
        if (type === 'song') data.song = value
        if (type === 'prayer' && value.trim().length > 0)
            data.prayer_points.push(value)
        if (type === 'verse' && value.length > 0)
            data.verses.push({ ref: getValue(row.getCell(3)), text: value })
    })
    return data
}

if (argv[2] === 'to_xlsx') {
    const files = (await readdir('./src/stations/')).filter(
        (f) => extname(f).toLocaleLowerCase() === '.yaml',
    )

    console.log('Found ' + files.length + ' yaml files.')

    const workbook = new ExcelJS.Workbook()

    for (const file of files) {
        const yamlData = yaml.load(
            await readFile(join('./src/stations/', file), 'utf8'),
        ) as JsonData
        const sheetName =
            yamlData.number.toString().padStart(2, '0') + ' ' + yamlData.name
        console.log('Writing sheet: ' + sheetName)
        const excelData = json_to_excel(yamlData)
        const sheet = workbook.addWorksheet(sheetName)
        sheet.addRows(excelData)
        // sheet.columns.forEach((c) => (c.font = { size: 14 }))
        sheet.getColumn(1).font = { bold: true }

        sheet.getColumn(1).width = 12
        sheet.getColumn(1).alignment = { vertical: 'middle' }

        sheet.getColumn(2).width = 50
        sheet.getColumn(2).alignment = {
            vertical: 'top',
            horizontal: 'left',
            wrapText: true,
        }

        sheet.getColumn(3).width = 20
        sheet.getColumn(3).alignment = { vertical: 'top' }
    }

    console.log('Saving to: ' + excelPath)
    await workbook.xlsx.writeFile(excelPath)
    console.log('Finished!')
} else if (argv[2] === 'to_yaml') {
    console.log('Reading file ' + excelPath)
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(excelPath)

    const path = './src/stations/'

    for (const worksheet of workbook.worksheets) {
        if (worksheet.name.charAt(0) === '#') continue

        const jsonData = excel_to_json(worksheet)

        const yamlString = yaml.dump(jsonData, {
            indent: 4,
        })

        const fileName =
            jsonData.number.toString().padStart(2, '0') +
            ' ' +
            jsonData.name +
            '.yaml'

        await writeFile(join(path, fileName), yamlString)
        console.log('Wrote ' + fileName)
    }
    console.log('Finished!')
}

interface VerseDefinition {
    ref: string
    text: string
}

interface JsonData {
    number: number
    name: string
    name_kanji: string
    description: string
    song: string
    verses: VerseDefinition[]
    prayer_points: string[]
}
