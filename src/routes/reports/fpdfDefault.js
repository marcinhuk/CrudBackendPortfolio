const fpdf = require('node-fpdf')
const moment = require('moment')

class FPDFDEFAULT extends fpdf{
	full_name = ''
	reportName = ''
	now = new moment().format('MM-DD-YYYY HH:mm:ss')

	Header(){
		this.SetFont('Arial','', 7)
		this.MultiCell(0, 5,`Page ${this.PageNo()} of {nb}`, 0, 'R')
	}

	Footer(){
		this.SetY(-18)
		this.SetFont('Arial','',7);
		this.Cell(60, 4, this.full_name, 'T', 0, 'L');
		this.Cell(60, 4, this.reportName, 'T', 0, 'C');
		this.MultiCell(0, 4, this.now, 'T', 'R');
	}
}

module.exports = FPDFDEFAULT