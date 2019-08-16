import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'





class App extends React.Component {
  constructor() {
		super()
		this.state = {
      date: '',
      day: '',
      month: '',
      year: '',
      explanation: '',
      imgurl: '',
      title: '',
    }
  }





  componentDidMount() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=XwKI21F7dNGNhG5VDvBsLIjiVbaQFGhUwSfSZRVE')
    .then((response) => response.json()) 
    .then((responseData) => { 
       console.log(responseData);
        this.setState({ 
          explanation: responseData.explanation,
          imgurl: responseData.url,
          title: responseData.title
        }); 
    });
  }

  async onDayChange(e) {
    let day = e.target.value
    await this.setState({ day: day })
    console.log('State.day = ' + this.state.day)
  }

  async onMonthChange(e) {
    let month = e.target.value
    await this.setState({ month: month })
    console.log('State.month = ' + this.state.month)
  }

  async onYearChange(e) {
    let year = e.target.value
    await this.setState({ year: year })
    console.log('State.year = ' + this.state.year)
  }

  async onClick(e) {
    e.preventDefault();
    await this.setState({
      date: `${this.state.year}-${this.state.month}-${this.state.day}`
    })
    console.log(this.state.date)
    if (
      this.state.year.length !== 4 
      && this.state.month.length !== 2 
      && this.state.day.length !== 2) {
      alert('Please fill in all fields using the correct format')
    } else {
      if (this.state.year > 1995) {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=XwKI21F7dNGNhG5VDvBsLIjiVbaQFGhUwSfSZRVE&date=${this.state.date}`)
        .then((response) => response.json()) 
        .then((responseData) => { 
          console.log(responseData);
          this.setState({ 
            explanation: responseData.explanation,
            imgurl: responseData.url 
          })
        })
        .catch(err => {
          this.setState({
            title: 'ERROR',
            explanation: `NASA's Astronamy Picture of the Day (APOD) launched June 16 1995. Please make sure your date entry falls after this date`
          })
        })
      } else if (this.state.year == 1995 && this.state.month > 6) {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=XwKI21F7dNGNhG5VDvBsLIjiVbaQFGhUwSfSZRVE&date=${this.state.date}`)
        .then((response) => response.json()) 
        .then((responseData) => { 
          console.log(responseData);
          this.setState({ 
            explanation: responseData.explanation,
            imgurl: responseData.url 
          })
        })
        .catch(err => {
          this.setState({
            title: 'ERROR',
            explanation: `NASA's Astronamy Picture of the Day (APOD) launched June 16 1995. Please make sure your date entry falls after this date`
          })
        })
      } else if (this.state.year == 1995 && this.state.month == 6 && this.state.day >= 16) {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=XwKI21F7dNGNhG5VDvBsLIjiVbaQFGhUwSfSZRVE&date=${this.state.date}`)
        .then((response) => response.json()) 
        .then((responseData) => { 
          console.log(responseData);
          this.setState({ 
            explanation: responseData.explanation,
            imgurl: responseData.url 
          })
        })
        .catch(err => {
          this.setState({
            title: 'ERROR',
            explanation: `NASA's Astronamy Picture of the Day (APOD) launched June 16 1995. Please make sure your date entry falls after this date`
          })
        })
      } else {
        this.setState({
          title: `ERROR`,
          explanation: `NASA's Astronamy Picture of the Day (APOD) launched June 16 1995. Please make sure your date entry falls after this date`,
          imgurl: 'https://www.materialui.co/materialIcons/alert/error_red_192x192.png',
        })
      }
    } 
  }

  render () {
    return (
      <div>
        <Paper className="PaperContainer">
          <Grid container>
              <Grid item md className="FormItem">
              <FormControl>
                <InputLabel htmlFor="my-input">Day</InputLabel>
                <Input onChange={this.onDayChange.bind(this)} id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">DD</FormHelperText>
              </FormControl>
              </Grid>
              <Grid item md className="FormItem">
              <FormControl>
                <InputLabel htmlFor="my-input">Month</InputLabel>
                <Input onChange={this.onMonthChange.bind(this)} id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">MM</FormHelperText>
              </FormControl>
              </Grid>
              <Grid item md className="FormItem">
              <FormControl>
                <InputLabel htmlFor="my-input">Year</InputLabel>
                <Input onChange={this.onYearChange.bind(this)} id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">YYYY</FormHelperText>
              </FormControl>
              </Grid>
              <Grid item md className="FormItem" style={{ marginTop: "1rem", marginRight: "-1.5rem" }}>
              <Button onClick={this.onClick.bind(this)} variant="contained" className="MainSubmit" style={{ color: 'white', backgroundColor: 'black' }} >
                Go
              </Button>
              </Grid>
          </Grid>
        </Paper>
          <Paper style={{ width: '100%', margin: 'auto', marginTop: '2rem', background: '#222222' }}>
            <Grid container>
              <Grid style={{ margin: '2rem' }} item md>
                <img src={this.state.imgurl} style={{ maxWidth: '500px' }} />
              </Grid>
              <Grid style={{ margin: '2rem' }} item md>
                <h2 style={{ color: 'white', fontWeight: 'bold' }} >{this.state.title}</h2>
                <Typography style={{ color: 'white' }} >{this.state.explanation}</Typography>
              </Grid>
             </Grid> 
          </Paper>
      </div>
    );
  }
}

export default App;
