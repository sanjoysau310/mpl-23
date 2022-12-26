package com.mpl.utils;

import javax.servlet.http.HttpServletRequest;

import com.mpl.entities.Player;

public class EmailSetup {

	public static String getEmailBodyForRegistration(HttpServletRequest request, Player player) {

		// Get client's origin
		String clientOrigin = request.getHeader("origin");

		String styleText = "<style>" + "table {" + "  font-family: arial, sans-serif;" + "  border-collapse: collapse;"
				+ "  width: 70%;}" + "th {" + "  border: 1px solid #dddddd;" + "  text-align: center;"
				+ "  padding: 8px;}" + "td {" + "  border: 1px solid #dddddd;" + "  text-align: left;"
				+ "  padding: 8px;}" + "tr:nth-child(even) {" + "  background-color: #dddddd;" + "}" + "</style>";

		//String paymentStatus = player.getpPaymentMode().equals("Cash") ? "Pending" : player.getpPaymentStatus();

		String tableText = "<table align='center'><thead><tr><th colspan='2'><h3>MPL 2023 Player Registration</h3></th></tr></thead>"
				+ "<tbody><tr><td>Full Name</td><td>" + player.getpName() + "</td></tr>" + "<tr><td>Phone</td><td>"
				+ player.getpPhone() + "</td></tr>" + "<tr><td>Email</td><td>" + player.getpEmail() + "</td></tr>"
				+ "<tr><td>Date of Birth</td><td>" + player.getpDob() + "</td></tr>" + "<tr><td>Role</td><td>"
				+ player.getpRole() + "</td></tr>" + "<tr><td>Batting Style</td><td>" + player.getpBatting()
				+ "</td></tr>" + "<tr><td>Bowling Style</td><td>" + player.getpBowling() + "</td></tr>"
				+ "<tr><td>Kit Size</td><td>" + player.getpKit() + "</td></tr>" + "<tr><td>Registration Fees</td><td>"
				+ player.getpFees() + "</td></tr>" + "<tr><td>Payment Mode</td><td>" + player.getpPaymentMode()
				+ "</td></tr>" + "<tr><td>Payment Status</td><td>Pending</td></tr>" + "</tbody></table>";

		String greetText = "<br><br><br>" + "All The Best.<br>" + "For any further assistance, do reach out to us at "
				+ "<a href='" + clientOrigin + "/contact'><b>Contact Us</b></a>."
				+ " We are always happy to help you!<br><br>" + "Reagards,<br>" + "Musketeers Premier League";

		StringBuilder mailBody = new StringBuilder();
		mailBody.append("<html>");
		mailBody.append("<head>");
		mailBody.append(styleText);
		mailBody.append("</head>");
		mailBody.append("<body>");
		mailBody.append(tableText);
		mailBody.append(greetText);
		mailBody.append("</body>");
		mailBody.append("</html>");
		return mailBody.toString();
	}

	public static String getEmailBodyForPayment(HttpServletRequest request, Player player) {

		// Get client's origin
		String clientOrigin = request.getHeader("origin");

		String styleText = "<style>" + "table {" + "  font-family: arial, sans-serif;" + "  border-collapse: collapse;"
				+ "  width: 70%;}" + "th {" + "  border: 1px solid #dddddd;" + "  text-align: center;"
				+ "  padding: 8px;}" + "td {" + "  border: 1px solid #dddddd;" + "  text-align: left;"
				+ "  padding: 8px;}" + "tr:nth-child(even) {" + "  background-color: #dddddd;" + "}" + "</style>";

		//String paymentStatus = player.getpPaymentMode().equals("Cash") ? "Pending" : player.getpPaymentStatus();

		String tableText = "<table align='center'><thead><tr><th colspan='2'><h3>MPL 2023 Player Registration</h3></th></tr></thead>"
				+ "<tbody><tr><td>Full Name</td><td>" + player.getpName() + "</td></tr>" + "<tr><td>Phone</td><td>"
				+ player.getpPhone() + "</td></tr>" + "<tr><td>Email</td><td>" + player.getpEmail() + "</td></tr>"
				+ "<tr><td>Registration Fees</td><td>" + player.getpFees() + "</td></tr>"
				+ "<tr><td>Payment Mode</td><td>" + player.getpPaymentMode() + "</td></tr>"
				+ "<tr><td>Payment Status</td><td>" + player.getpPaymentStatus() + "</td></tr>" + "</tbody></table>";

		String greetText = "<br><br><br>" + "All The Best.<br>" + "For any further assistance, do reach out to us at "
				+ "<a href='" + clientOrigin + "/contact'><b>Contact Us</b></a>."
				+ " We are always happy to help you!<br><br>" + "Reagards,<br>" + "Musketeers Premier League";

		StringBuilder mailBody = new StringBuilder();
		mailBody.append("<html>");
		mailBody.append("<head>");
		mailBody.append(styleText);
		mailBody.append("</head>");
		mailBody.append("<body>");
		mailBody.append(tableText);
		mailBody.append(greetText);
		mailBody.append("</body>");
		mailBody.append("</html>");
		return mailBody.toString();
	}
}
