const FPDFDEFAULT = require('./fpdfDefault')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const findOrder = async (id) => {
	try{
		const database = require('../../db')

		const [order] = await database.query(`select orders.id, DATE_FORMAT(orders.date, '%m-%d-%Y %H:%i:%s') as date, orders.status, users.full_name from orders, users where orders.user_id=users.id and orders.id=${id} order by orders.id desc`)

		return order
	} catch(e){
		return e
	}
}

const order = async(req, res) => {
	const data = await findOrder(req.params.id)
	const count = data.length

	const pdf = new FPDFDEFAULT('P','mm','A4')

	pdf.AliasNbPages()
	pdf.AddPage()
	pdf.SetFont('Arial', '', 8)

	pdf.full_name = req.full_name
	pdf.reportName = 'Order details report'

	if (count > 0){
		pdf.Image('./src/files/images/logo.jpeg', 70, null, 60, 0, 'jpeg')

		pdf.MultiCell(0, 4, `ORDER DETAILS REPORT`, 0, 'C')

		pdf.Ln(5)

		const status = data[0].status == 0 ? 'Rejected' : data[0].status  ==  1 ? 'Aproved' : 'Awaiting'

		pdf.MultiCell(0, 4, `Order ID: ${data[0].id}`, '', 'L')
		pdf.MultiCell(0, 4, `User: ${data[0].full_name}`, '', 'L')
		pdf.MultiCell(0, 4, `Date ${data[0].date}`, '', 'L')
		pdf.MultiCell(0, 4, `Status: ${status}`, '', 'L')

		pdf.Ln(3)

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

module.exports = order