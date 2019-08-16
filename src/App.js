import React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

  // function currying
  onChange = field => e => {
    this.setState({
      [field]: e.target.value
    })
    console.log(this.state.day)
  }

  fetchData() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=XwKI21F7dNGNhG5VDvBsLIjiVbaQFGhUwSfSZRVE&date=${this.state.date}`)
        .then((response) => response.json()) 
        .then((responseData) => { 
          console.log(responseData);
          this.setState({ 
            title: responseData.title,
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
            title: responseData.title,
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
      } else if (this.state.year === 1995 && this.state.month > 6) {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=XwKI21F7dNGNhG5VDvBsLIjiVbaQFGhUwSfSZRVE&date=${this.state.date}`)
        .then((response) => response.json()) 
        .then((responseData) => { 
          console.log(responseData);
          this.setState({ 
            title: responseData.title,
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
            title: responseData.title,
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
                <Input type="number" onChange={this.onChange('day')} id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">DD</FormHelperText>
              </FormControl>
              </Grid>
              <Grid item md className="FormItem">
              <FormControl>
                <InputLabel htmlFor="my-input">Month</InputLabel>
                <Input type="number" onChange={this.onChange('month')} id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">MM</FormHelperText>
              </FormControl>
              </Grid>
              <Grid item md className="FormItem">
              <FormControl>
                <InputLabel htmlFor="my-input">Year</InputLabel>
                <Input type="number" onChange={this.onChange('year')} id="my-input" aria-describedby="my-helper-text" />
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
            <Grid container spacing={0} direction="row" alignItems="center" justify="center" >
              <Grid style={{ margin: '2rem'}} item md>
                <img alt="nasa_image_of_the_day" src={this.state.imgurl} style={{ maxWidth: '500px' }} />
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
