#!/usr/bin/env npx tsx

import { readdir, readFile } from 'node:fs/promises'
import { argv, exit } from 'node:process'
import { extname, join } from 'node:path'
import yaml from 'js-yaml'
import * as XLSX from 'xlsx'

import * as fs from 'fs'
XLSX.set_fs(fs)

if (argv.length < 4 || ['to_xlsx', 'to_yaml'].indexOf(argv[2]) === -1) {
    console.log('Usage: data_convert [to_xlsx|to_yaml] <xlsx path>')
    exit(1)
}

const excelPath = argv[3]

function json_to_excel(json: JsonData) {
    const rows: (string | number)[][] = [
        ['Type', 'Reference', 'Value'],
        ['number', '', json.number],
        ['name', '', json.name],
        ['kanji', '', json.name_kanji],
        ['description', '', json.description],
        ['song', '', json.song],
        [],
    ]

    for (let i = 0; i < Math.min(3, json.verses.length); i++) {
        rows.push(['verse', json.verses[i].ref, json.verses[i].text])
    }

    rows.push([])

    for (let i = 0; i < Math.max(3, json.prayer_points.length); i++) {
        rows.push(['prayer', '', json.prayer_points[i]])
    }

    return rows
}
// number
// name
// kanji
// description
// song
// verse
// verse
// prayer
// prayer
// prayer
//
if (argv[2] === 'to_xlsx') {
    const files = (await readdir('./src/stations/')).filter(
        (f) => extname(f).toLocaleLowerCase() === '.yaml',
    )

    console.log('Found ' + files.length + ' yaml files.')

    const workbook = XLSX.utils.book_new()

    for (const file of files) {
        const yamlData = yaml.load(
            await readFile(join('./src/stations/', file), 'utf8'),
        ) as JsonData
        console.log('Writing sheet: ' + yamlData.name)
        const excelData = json_to_excel(yamlData)
        const sheet = XLSX.utils.aoa_to_sheet(excelData)
        XLSX.utils.book_append_sheet(workbook, sheet, yamlData.name)
    }

    console.log('Saving to: ' + excelPath)
    XLSX.writeFile(workbook, excelPath, { compression: true })
    console.log('Finished!')
} else if (argv[2] === 'to_yaml') {
}

interface ExcelRow {
    type:
        | 'number'
        | 'name'
        | 'kanji'
        | 'description'
        | 'song'
        | 'verse'
        | 'prayer'
    reference: string
    value: string | number
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
