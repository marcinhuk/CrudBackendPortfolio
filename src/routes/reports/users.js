const FPDFDEFAULT = require('./fpdfDefault')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const findAll = async () => {
	try{
		const database = require('../../db')

		const [users, metadata] = await database.query(`select * from users`)

		return users
	} catch(e){
		return e
	}
}

const users = async(req, res) => {
	const data = await findAll()
	const count = data.length

	const pdf = new FPDFDEFAULT('P','mm','A4')

	pdf.AliasNbPages()
	pdf.AddPage()
	pdf.SetFont('Arial', '', 8)

	pdf.full_name = req.full_name
	pdf.reportName = 'Users report'

	if (count > 0){
		pdf.Image('./src/files/images/logo.jpeg', 70, null, 60, 0, 'jpeg')

		pdf.MultiCell(0, 4, `USERS REPORT`, 0, 'C')

		pdf.Ln(5)

		pdf.SetFillColor(235, 235, 235)
		pdf.Cell(50, 4, 'Name', 'BT', 0, 'L', true)
		pdf.Cell(100, 4, 'Email', 'BT', 0, 'L', true)
		pdf.Cell(30, 4, 'Admin', 'BT', 0, 'C', true)
		pdf.MultiCell(0, 4, 'Active', 'BT', 'C', true)

		for (const line of data){
			const admin = line.admin == 0 ? 'No' : 'Yes'
			const active = line.active == 0 ? 'No' : 'Yes'
			pdf.Cell(50, 4, line.full_name, 'BT', 0, 'L')
			pdf.Cell(100, 4, line.email, 'BT', 0, 'L')
			pdf.Cell(30, 4, admin, 'BT', 0, 'C')
			pdf.MultiCell(0, 4, active, 'BT', 'C')
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

module.exports = users