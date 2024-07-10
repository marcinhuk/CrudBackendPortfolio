const FPDFDEFAULT = require('./fpdfDefault')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const findAll = async () => {
	try{
		const database = require('../../db')

		const [orders, metadata] = await database.query(`select orders.id, DATE_FORMAT(orders.date, '%m-%d-%Y %H:%i:%s') as date, orders.status, users.full_name from orders, users where orders.user_id=users.id order by orders.id desc`)

		return orders
	} catch(e){
		return e
	}
}

const orders = async(req, res) => {
	const data = await findAll()
	const count = data.length

	const pdf = new FPDFDEFAULT('P','mm','A4')

	pdf.AliasNbPages()
	pdf.AddPage()
	pdf.SetFont('Arial', '', 8)

	pdf.full_name = req.full_name
	pdf.reportName = 'Orders report'

	if (count > 0){
		pdf.Image('./src/files/images/logo.jpeg', 70, null, 60, 0, 'jpeg')

		pdf.MultiCell(0, 4, `ORDERS REPORT`, 0, 'C')

		pdf.Ln(5)

		pdf.SetFillColor(235, 235, 235)
		pdf.Cell(30, 4, 'Order ID', 'BT', 0, 'C', true)
		pdf.Cell(45, 4, 'Date', 'BT', 0, 'C', true)
		pdf.Cell(25, 4, 'Status', 'BT', 0, 'C', true)
		pdf.MultiCell(0, 4, 'User', 'BT', 'L', true)

		for (const line of data){
			const status = line.status == 0 ? 'Rejected' : line.status  ==  1 ? 'Aproved' : 'Awaiting'
			pdf.Cell(30, 4, line.id, 'BT', 0, 'C')
			pdf.Cell(45, 4, line.date, 'BT', 0, 'C')
			pdf.Cell(25, 4, status, 'BT', 0, 'C')
			pdf.MultiCell(0, 4, line.full_name, 'BT', 'L')
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

module.exports = orders