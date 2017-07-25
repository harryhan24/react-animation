import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/* 덱정보 가져오기 */
import Deck from './src/Deck';
/* react native element 요소 가져오기*/
import { Card, Button} from 'react-native-elements';

/* 사용할 데이터 */
const DATA = [
	{ id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
	{ id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
	{ id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
	{ id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
	{ id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
	{ id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
	{ id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
	{ id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];


export default class App extends React.Component {

	/**
	 *
	 * @param item - DATA카드를 데이터로 받는다(id, text, url)
	 */
	renderCard(item){
		return(
			/**     이름을 반환함     **/
			<Card
				key={item.id}
				title={ item.text }
			    image={{ uri: item.uri }}
			>
				<Text style={{ marginBottom: 10}}>
					I can customize the card further.
				</Text>
				<Button
					icon={{ name: 'code' }}
				    backgroundColor="#03A9F4"
				    title="View now!"
				/>
			</Card>
		)
	}

	renderNoMoreCards(){
		return(
			<Card title="All Done!">
				<Text style={{marginBottom:10}}>
					There's no more content here!
				</Text>
				<Button
					title="get more!"
				    backgroundColor="#03A9F4"
				/>
			</Card>
		)
	}


	render() {
		return (
			<View style={ styles.container }>
				<Deck
					/** 데이터를 전달함 **/
					data={DATA}
					/** Deck에 renderCard 인자로 함수를 전달함 **/
				    renderCard={this.renderCard}
					renderNoMoreCards={this.renderNoMoreCards}
				    /** **/
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		flex: 1,
		backgroundColor: '#fff'
	},
});
