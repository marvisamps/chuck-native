import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native'
import styled from 'styled-components';

import { View } from 'react-native';

import { API } from './constants';

const JokeItem = styled.Text`
  font-size: 16;
  color: blue;
  margin-bottom: 10;
`;

const JokeDescription = styled(JokeItem)`
  color: red;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        jokes: [],
    }
  }

  fetchJokes = (number) => {
    fetch(`${API}${number}`)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          throw new Error(`Couldn't fetch data`)
        }
      })
      .then(data => this.setState({
        jokes: data.value,
      }))
  }

  componentDidMount(){
    this.fetchJokes(5);
  }

  render(){
    Reactotron.log(this.state.jokes);
    const { jokes } = this.state;

    return (
      <View style={{ paddingHorizontal: 50, paddingVertical: 50 }}>
        {jokes.map(item => 
          <View>
            <JokeItem key={item.joke}>{item.joke}</JokeItem>
            <JokeDescription>Read more</JokeDescription>
          </View>
        )}
      </View>
    );
  }
};

export default App;
