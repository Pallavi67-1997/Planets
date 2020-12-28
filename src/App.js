import React , {Component} from "react";
import Tabs from "./Components/Tabs"; 
import "./App.css";

class App extends  Component {
	 constructor() {
		 super();
this.state={
	fav_list:[],
			allChecked:false,
			singlecheck:[],
			planets:[],
			tick:false
			}
			
	
		
 this.handlechange=this.handlechange.bind(this);
 this.handlesubmit=this.handlesubmit.bind(this);
 this.handleselectall=this.handleselectall.bind(this);
 
  
	 } 	
	  
	  
	handlesubmit(event){
	
		alert("click on the selected planets tab to view your favourite planets")
		var push_list= this.state.fav_list;
		var remove_length= push_list.length;
		for(var i=0;i< remove_length;i++){
			push_list.pop();
		}
		
		for(var i =0; i< this.state.planets.length; i++){
			if(this.state.planets[i].isFavourite==true){
				push_list.push(this.state.planets[i].name)
				
			}
		}
		
		console.log(push_list);	
		this.setState({fav_list:push_list});
		console.log(this.state.fav_list);
		
	
	}  
	handleselectall(event){
		var allChecked1= this.state.allChecked;
		this.setState({allChecked:!allChecked1})
		var planets1= this.state.planets;
		for(var i=0; i< planets1.length; i++){
			planets1[i].isFavourite=!allChecked1
		}
		this.setState({planets:planets1})
	}
handlechange(event, iterator){
	var id1 = event.target.id;
	var tick;
	for (var i=0;i<this.state.planets.length;i++){
		if(this.state.planets[i].id==id1){
			tick=this.state.planets[i].isFavourite
		}
	}
	console.log(tick);
	
	this.setState(prevState => ({
    planets: prevState.planets.map(
    obj => (obj.id === id1 ? Object.assign(obj, { isFavourite: !tick}) : obj)
  )
}));
	}
	
componentDidMount(){
	fetch("https://assignment-machstatz.herokuapp.com/planet")
	.then(res => res.json())
	.then((data)=>{
		this.setState({planets:data})
		
	})
	.catch(console.log)
} 

render(){
	//console.log(this.state.planets.length);
	var show =[];
	for (var i=0; i<this.state.planets.length;i++){
		var iterator=i;
		show.push(<li><input type="checkbox"  id = {this.state.planets[i].id}
		value={this.state.planets[i].name}  name="singleselect" checked={this.state.planets[i].isFavourite}
		onChange ={this.handlechange}
	/>
		{this.state.planets[i].name}<br/></li>);
	}
	
	var favourite_planets=[];
	for(var i=0;i< this.state.fav_list.length;i++){
		favourite_planets.push(<li>{this.state.fav_list[i]}</li>);
	}
	return (
	
	<div>
	<Tabs>
	<div label ="List of planets">
	<li><input type="checkbox" value="checkall" name="selectall"  checked={this.state.allChecked} onChange={this.handleselectall}
/>checkall </li><br/>
	<ul>
	{show}
		</ul>
	<input type="button" value="submit" onClick={this.handlesubmit}/>
	</div>
	<div label="selected planets">
	<h1>hello</h1>
	<ul>
	{favourite_planets}
	</ul>
	</div>
	</Tabs>
	</div>
	);
 
}
}

export default App;