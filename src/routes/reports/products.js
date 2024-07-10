const FPDFDEFAULT = require('./fpdfDefault')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const findAll = async () => {
	try{
		const database = require('../../db')

		const [products, metadata] = await database.query(`select * from products`)

		return products
	} catch(e){
		return e
	}
}

let USDollar = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

const products = async(req, res) => {
	const data = await findAll()
	const count = data.length

	const pdf = new FPDFDEFAULT('P','mm','A4')

	pdf.AliasNbPages()
	pdf.AddPage()
	pdf.SetFont('Arial', '', 8)

	pdf.full_name = req.full_name
	pdf.reportName = 'Products report'

	if (count > 0){
		pdf.Image('./src/files/images/logo.jpeg', 70, null, 60, 0, 'jpeg')

		pdf.MultiCell(0, 4, `PRODUCTS REPORT`, 0, 'C')

		pdf.Ln(5)

		pdf.SetFillColor(235, 235, 235)
		pdf.Cell(130, 4, 'Name', 'BT', 0, 'L', true)
		pdf.MultiCell(0, 4, 'Price', 'BT', 'R', true)

		for (const line of data){
			pdf.Cell(130, 4, line.name, 'BT', 0, 'L')
			pdf.MultiCell(0, 4, USDollar.format(line.price), 'BT', 'R')
		}

		pdf.isFinished = true
	} else
		pdf.Cell(150, 5, 'No records found.', 0, 'L')

	const fileName = `${uuidv4()}.pdf`

	pdf.Output('F', `./src/files/reports/${fileName}`, true)

	setTimeout(() => {
		res.download(`./src/files/reports/${fileName}`)
	}, 350)

	setTimeout(() => {
		fs.unlinkSync(`./src/files/reports/${fileName}`)
	}, 2000)
}

module.exports = products