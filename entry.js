/**
 * Created by chuck on 2016/12/2.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {ajaxget, ajaxpost} from './src/ajax'

ReactDOM.render(
  <span>Hello React</span>,//虚拟dom
  document.getElementById('root0') //真实dom
);

//...
class MyTitle extends React.Component {
  render() {
    return <h1 style={{color: this.props.color}}>Hello</h1>
  }
}
ReactDOM.render(
  <MyTitle color="yellow" />,
  document.getElementById('root1')
);


//...
class MyInput extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: '请输入'
    }
  }

  handleChange(e) {
    let name = e.target.value;
    this.setState({
      name: name
    })
  }

	render() {
		return (
		  <div>
        <input type="text" onChange={this.handleChange.bind(this)}/>
        <p>hello, {this.state.name}</p>
      </div>
    )
	}
}
ReactDOM.render(
  <MyInput/>,
  document.getElementById('root2')
);

//...
class ClickText extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      text: 'World',
      isClick: false
    }
  }

  componentWillMount() {
    console.log('组件将加载')
  }
  componentDidMount() {
    console.log('加载后')
  }
  componentWillUpdate() {
    console.log('将更新')
  }
  componentDidUpdate() {
    console.log('更新了')
  }
  changeText() {
    let date,y,m,d;
    date = new Date();
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDay();
    let isClick = this.state.isClick;
    console.log('dianji');
		this.setState({
			text: isClick ? 'World' : y + '年' + m + '月' + d + '日',
			isClick: !isClick
		})
  }
  render() {
    return <div onClick={this.changeText.bind(this)}>{this.props.text}{this.state.text}</div>
  }
}
ReactDOM.render(
  <ClickText text="Hello: "/>,
  document.getElementById('root3')
);



//...
function NumberList(props) {
	const items = props.items;
	const listItems = items.map((item,index) =>
		<li key={index}>{item.name}</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}
function Loading() {
	return (
		<div style={{width:'100px',height:'100px',position:'absolute'}}>Loading...</div>
	)
}
class GithubPopularList  extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      isLoading: true,
      listData: []
    }
  }
	componentDidMount() {
    this.getList()
  }
  getList() {
		this.setState({
			isLoading: true,
		});
		const url = 'https://api.github.com/search/repositories?q=javascript&sort=stars';
		ajaxget(url, (result) => {
		  // console.log(typeof result);
			this.setState({
				isLoading: false,
				listData: result.items
			})
		})
  }


  render() {
    return (
      <div>
        <button onClick={this.getList.bind(this)}>获取数据</button>
				<div style={{display: this.state.isLoading?'block':'none'}}>
					<Loading />
				</div>
				<div style={{display: this.state.isLoading?'none':'block'}}>
					<NumberList items={this.state.listData}/>
				</div>
      </div>
    )
  }
}
ReactDOM.render(
	<GithubPopularList />,
  document.getElementById('root4')
);



