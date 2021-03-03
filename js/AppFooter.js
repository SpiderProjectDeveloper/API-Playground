import React, { Component } from 'react';
import styles from './../css/appfooter.css'; 

class AppFooter extends React.Component {
	render() {
		return (
			<div className={styles.container}>
				Powered by <a target=_blank href='https://reactjs.org'>React</a>.
				See the source code and the licence <a href='https://github.com/SpiderProjectDeveloper/API-Playground'>here</a>.
			</div>
		);
	}
}

export default AppFooter;