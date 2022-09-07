const fs = require('fs')
const readline = require('readline');
const filepath = './data/contact.json' // inisiasi file path berdasarkan folder data/json
const exixst = fs.existsSync('./data') // inisiasi cek folder data 
const exixstFile = fs.existsSync(filepath) //inisiasi cek file contact.json


rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
})

if(!exixst){ //cek apakah folder data tidak ada
    fs.mkdirSync('./data', (err)=> { //membuat folder baru bernama data
        if (err) throw err
    })
}
if(!exixstFile){ //cek apakah file tidak ada
    fs.writeFileSync(filepath,'[]') //membuat file baru contact.json
}
const getdata = (name, number, email)=> {
    const contact = {name, number, email} //inisiasi contact
    const file = fs.readFileSync(filepath,'utf-8') //membaca filepath
    const contacts = JSON.parse(file) // parsing json 
    contacts.push(contact) // push data contacts kepada contact
    fs.writeFileSync(filepath,JSON.stringify(contacts)) //membuat file contact yang sudah di konversi menjadi string
    console.log('Terimakasih sudah memasukkan data')
    rl.close()
}

// make a function to ask
const quest = (questions) =>{ //questions = pertanyaan input
    return new Promise((res, _)=> {
        rl.question(questions, (input)=>{ //pertanyaannya, dan input
            res(input)
        })
    })
} 

const data = async ()=> {
    const name = await quest('what is your name ? ');
    const number = await quest('what is your number ? ');
    const email = await quest('what is your email ? ');
    getdata(name,number, email)
}
data();