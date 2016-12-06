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

//...
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from './node_modules/Recharts';
const data = [
	{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
	{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
	{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
	{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
	{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
	{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
	{name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
class SimpleLineChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render () {
		return (
			<LineChart width={600} height={300} data={data}
								 margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<XAxis dataKey="name"/>
				<YAxis/>
				<CartesianGrid strokeDasharray="3 3"/>
				<Tooltip/>
				<Legend />
				<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
				<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
			</LineChart>
		);
	}
}

ReactDOM.render(
	<SimpleLineChart />,
	document.getElementById('root5')
)