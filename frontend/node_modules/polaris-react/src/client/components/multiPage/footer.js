import React from 'react';
import { Col, Container, Row, Footer, Button } from 'mdb';

class FooterPage extends React.Component {
	render(){
		return(
			<Footer color="stylish-color-dark " className="font-small pt-4 mt-4">
				<Container className="text-left">
					<Row>
						<Col sm="6">
							<h5 className="text-uppercase">Site info</h5>
							<p>Polaris website, and web panel beta. Made with MDB bootstrap and express. Panel built
								with React.</p>
							<h6><Button size="sm" color ="elegant" onClick={clearLocal}>Clear cache</Button></h6>

							<a href="https://discordbots.org/bot/375408313724043278" className="pb-2">
								<img src="https://discordbots.org/api/widget/375408313724043278.svg" alt="Polaris"/>
							</a>
						</Col>
						<Col sm="6">
							<h5 className="title">Links</h5>
							<ul className="list-unstyled">
								<li>
									<a href="/terms">Terms of use</a>
								</li>
								<li>
									<a href="https://twitter.com/botPolaris">Twitter</a> <a
										href="https://twitter.com/botPolaris" className="btn-floating btn-tw mx-1">
										<i className="fa fa-twitter"> </i>
									</a>
								</li>
							</ul>
						</Col>
					</Row>
				</Container>
				<div className="footer-copyright text-center">
					<Container fluid>
                        &copy; {(new Date().getFullYear())} Copyright: <a href="mailto:josh@muir.xyz"> Josh Muir </a>
					</Container>
				</div>
			</Footer>
		);
	}
}

export default FooterPage;


function clearLocal () {
	localStorage.clear();
	document.cookie = "auth=exp; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	location.reload();
}