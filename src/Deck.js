import React, {Component} from 'react';
import {
	View,
	Animated,
	PanResponder,
	Dimensions
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25*SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component{

	static defaultProps = {
		onSwipeRight: ()=>{},
		onSwipeLeft: ()=>{}
	};

	constructor(props){

		super(props);

		/* panResponder 만들고 */

		/* 이용되는 포지션 애니메이션 만들어주기 */
		const position = new Animated.ValueXY();
		/* onStartShouldSetPanResponder true return 은 어떤 상황에서든 유저 dragging을 허용함*/
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {

				/* gesture를 x,y값으로 받아 셋팅 */
				position.setValue({x: gesture.dx, y:gesture.dy})
			},
			onPanResponderRelease: (event,gesture) => {
				//애니메이션 끝난 후의 동작, 어느정도 동작이 들어갔나로 확인 후 애니메이션 실행

				if(gesture.dx > SWIPE_THRESHOLD){

					this.forceSwipe('right');

				}else if(gesture.dx < -SWIPE_THRESHOLD){

					this.forceSwipe('left');

				}else{
					this.resetPosition();
				}

			}
		});


		/* State로 사용가능하도록 명시해줌 */
		this.state = { panResponder , position, index: 0 }
	}

	forceSwipe(direction){

		const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
		//spring과 다르게 duration이 들어감
		Animated.timing(this.state.position, {
			toValue: {x: x, y:0},
			duration: SWIPE_OUT_DURATION

			//callback
		}).start(()=> this.onSwipeComplete(direction));
		//this.prevNextCard()
	}

	onSwipeComplete(direction){
		const { onSwipeLeft, onSwipeRight, data } = this.props;
		const item = data[this.state.index];


		direction == 'right' ? onSwipeRight(item) : onSwipeLeft(item);
		this.state.position.setValue({x:0, y:0});
		this.setState({index: this.state.index +1 });
	}





	resetPosition(){
		Animated.spring(this.state.position, {
			toValue: {x:0, y:0}
		}).start();

	}

	getCardStyle(){

		//자주쓰니까 position만 빼줌
		const { position } = this.state;
		//position에 xy정보가 있음
		const rotate = position.x.interpolate({
			inputRange:[-SCREEN_WIDTH * 1.5 , 0, SCREEN_WIDTH * 1.5],
			outputRange:['-120deg', '0deg', '120deg']
		});


		return {
			// this.state.position.getLayout()과 같음
			...position.getLayout(),
			transform: [{ rotate }] // = rotate:rotate
		}
	}

	/* 카드들을 만들어줍니다. */
	renderCards(){
		//data로 받은 내용을 item loop을 통해 return 해줌
		return this.props.data.map((item, index) =>{

			if(index === 0){
				return(
					<Animated.View
						key={item.id}
						style={this.getCardStyle()}
						{...this.state.panResponder.panHandlers}
					>
						{this.props.renderCard(item)}
					</Animated.View>
				)
			}


			return this.props.renderCard(item);
		})
	}
	render(){

		return(
			<View>
				{/* app.js를 통해 renderCard를 전달받음 */}
				{this.renderCards()}
			</View>



		);
	}
}

//const styles = {
//	cardStyle: {
//		position: 'absolute',
//		width: SCREEN_WIDTH
//	}
//};


export default Deck;


//const DATA = [
//	{ id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
//	{ id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
//	{ id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
//	{ id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
//	{ id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
//	{ id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
//	{ id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
//	{ id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
//];