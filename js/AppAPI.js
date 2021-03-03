import React, { Component } from 'react';
import styles from './../css/appapi.css'; 
import Settings from './Settings';

class AppAPI extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			itemChosenInAPIList: { 
                command:null, title:'...', description:null, 
                parameters: null, sampleParameters: null,
                result: null, sampleResult:null 
            },
		};

		this.listItemChosen = this.listItemChosen.bind(this);
	}

	listItemChosen(e, command, title, description, parameters, sampleParameters, result, sampleResult ) {
		this.setState( { 
                itemChosenInAPIList: { command:command, title:title, description:description, 
                    parameters: parameters, sampleParameters: JSON.stringify(sampleParameters),
                    result: result, sampleResult: JSON.stringify(sampleResult) } 
            } );
		this.props.updateRequestText( sampleParameters );
	}

	render() {
		return (
			<div className={styles.APIContainer}>
				<div className={styles.APIList}>
					<APIList onListItemChosen={this.listItemChosen} lang={this.props.lang} />
				</div>
				<div className={styles.APIItem}>
					<div className={styles.APIItemCommand}>
						{this.state.itemChosenInAPIList.command}
					</div>
					<div className={styles.APIItemTitle}>
						{this.state.itemChosenInAPIList.title}
					</div>
                    <div className={styles.APIItemParametersTitle}>{Settings.texts.parameters[this.props.lang]}</div>
					<div className={styles.APIItemParameters}>
						{this.state.itemChosenInAPIList.parameters}
					</div>
					<div className={styles.APIItemSampleParameters}>
						{this.state.itemChosenInAPIList.sampleParameters}
					</div>
                    <div className={styles.APIItemResultTitle}>{Settings.texts.result[this.props.lang]}</div>
					<div className={styles.APIItemResult}>
						{this.state.itemChosenInAPIList.result}
					</div>
					<div className={styles.APIItemSampleResult}>
						{this.state.itemChosenInAPIList.sampleResult}
					</div>
					<div className={styles.APIItemDescription}>
						{this.state.itemChosenInAPIList.description}
					</div>
				</div>
			</div>
		);
	}
}


class APIList extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {
			error: false,
			errorMessage: '',
			isLoaded: false,
			data: {}
		};	
	}

	componentDidMount() {
		let url = Settings.apiServerURL + 'api_list';
		fetch( url, { Origin: Settings.apiServerURL } )
			.then( response => response.json() )
			.then( data => { 
				this.setState( { error: false, isLoaded: true, data: data } ); 
				if( data.list.length > 0 ) {
					let item = data.list[0];
                    this.props.onListItemChosen( null, item.command, item.title, 
                        (typeof(item.description) !== 'undefined') ? item.description : null, 
                        item.parameters, item.sampleParameters,
                        item.result, item.sampleResult );
                }
			} )
			.catch( e => { 
                this.setState({ 
                    error:true, errorMessage: Settings.texts.errorLoadingAPIList[this.props.lang], isLoaded:true 
                }); 
            }); 
	}

	render() {
    	if (this.state.error) {
			return <div>{Settings.texts.errorLoadingAPIList[this.props.lang]}</div>;
		} 
		else if ( !this.state.isLoaded ) {
			return <div>Please wait while loading API calls list...</div>;
		} 
		else {
			return (
				<div>
					{ 
					this.state.data.list.map( item => (
						<div key={item.command} className={styles.APIListItem} onClick={ (e) => 
                            this.props.onListItemChosen( e, item.command, item.title, 
                                (typeof(item.description) !== 'undefined') ? item.description : null, 
                                item.parameters, item.sampleParameters, 
                                item.result, item.sampleResult ) }>
							<span className={styles.APIListItemCommand}>{item.command}</span> :: {item.title}
						</div> ) ) 	
					}
				</div>
      		);
    	}
  	}
}

export default AppAPI;