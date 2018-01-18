import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSkills, login, updateProperty, addAdditionalSKill } from './actions';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Item from './components/Item'

class HomeCmp extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePropertyChange= this.handlePropertyChange.bind(this);
        this.submitAdditionalSkill= this.submitAdditionalSkill.bind(this);
        this.onAdditionalSkillClick = this.onAdditionalSkillClick.bind(this);
        this.handleAdditionalSkillChange = this.handleAdditionalSkillChange.bind(this);
        this.state = {addSkill :false, additionalSkill: ''};
    }

    endDateValues = [{value: 'ongoing', label:'Ongoing'},{value: 'specific', label: 'Specific'}];
    genderValues = [{value: 'none', label:'None'},{value: 'male', label: 'Male'},{value: 'female', label: 'Female'}];

    componentDidMount(){
      const {isAuthenticated, login} = this.props;

      if (!isAuthenticated){
          //ideally this would come from a Login form 
         login({
                name:'admin',password:'admin'
              })
      }
    }

    componentDidUpdate() {
      const {isAuthenticated, isLoading, isReady, fetchData} = this.props;
      
      if (isAuthenticated && !isLoading && !isReady) {
         fetchData();
      }
    }
    
    handleFormSubmit(values) {
      const {formData} = this.props;
        console.log(formData);
    }    

    handleAdditionalSkillChange(event) {
        const value = event.target.value;
        this.setState({additionalSkill: value});
    }

    onAdditionalSkillClick(event) {
        this.setState({addSkill: !this.state.addSkill})
    }

    submitAdditionalSkill(event) {
      const {addNewSKill} = this.props;

      addNewSKill(this.state.additionalSkill);
      this.setState({addSkill: !this.state.addSkill, additionalSkill: ''})
    }

    handlePropertyChange(prop, value, fromEvent) {
      let newValue = value;
      if(fromEvent){
        const target = value.target;
        newValue = target.type === 'checkbox' ? target.checked : target.value;
      }

      this.props.updateField(prop, newValue);
    }


    render() {
        const { hasErrored, isLoading, authenticationError, authenticationRequested, formData, skills} = this.props;

        if (hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (isLoading || authenticationRequested) {
            return <p>Loading…</p>;
        }

        if (authenticationError) {
            return <p>Authentication Error!</p>;
        }
        return (
          <form name="infoForm">
            <div className="row container">

              <Item title="CLIENT SUMMARY" className="col-4">
                <div className="form-group">
                  <textarea className="form-control" rows="5" placeholder="Please add summary of the client and why they need care" onChange={(e) => this.handlePropertyChange('clientSummary',e,true)} style={{width:'100%'}}></textarea>
                </div>
              </Item>

              <Item title="DURATION OF PACKAGE" className="col-6">
                <div className="row p-0" >
                  <div className="form-group col-5">
                    <label >Start Date</label>
                      <DatePicker
                          selected={formData.startDate}
                          onChange={(e) => this.handlePropertyChange('startDate',e, false)}
                      />
                  </div>  
                  <div className="form-group col-3">
                    <label>End Date</label>
                    {this.endDateValues.map((item,index) => (
                      <div className="form-check"  key={index}>
                        <input className="form-check-input" type="radio" name="enddateRadio" id={'endDateRadio'+index} value={item.value} onChange={(e) => this.handlePropertyChange('endDate',e, true)} />
                        <label className="form-check-label" for={'endDateRadio'+index}>
                          {item.label}
                        </label>
                      </div>
                      ))}
                  </div>  
                </div>
              </Item>

              <Item title="SKILLS AND COMPETENCIES REQUIRED" className="col-4">
                <div className="form-group">
                  <Select 
                    multi
                    onChange={(e) => this.handlePropertyChange('selectedSkills',e,false)}
                    options={skills}
                    placeholder="Select skill or Competency"
                    simpleValue
                    value={formData.selectedSkills}
                  />
                  </div>
                  <div className="form-group">
                      {!this.state.addSkill ? <a href="#" onClick={this.onAdditionalSkillClick}>+Add Aditional Skill</a> : <div className="form-inline"><input type="text" name="additionalSkill"  className="form-control" value={this.state.additionalSkill} onChange={this.handleAdditionalSkillChange}/><button type="button" className="btn btn-primary" onClick={this.submitAdditionalSkill}>Add Skill</button></div>}
                  </div>
              </Item>

              <Item title="STAFF GENDER PREFERENCES" className="col-6" style={{height:100}}>
                <div className="form-group row mt-3 ml-3">
                    {this.genderValues.map((item,index) => (
                      <div className="form-check form-check-inline" key={index}>
                        <input className="form-check-input ml-0" type="radio" name="inlineRadioOptions" id={'genderRadio'+index}  value={item.value} onChange={(e) => this.handlePropertyChange('genderPreference',e, true)} />
                        <label className="form-check-label" for={'genderRadio'+index}>{item.label}</label>
                      </div>
                    ))}
                  </div>    
              </Item>

              <div className="col-12">
                <div className="form-group">
                  <button type="button" onClick={this.handleFormSubmit} className="btn btn-primary" disabled={!formData.selectedSkills.length > 0} >Next</button>
                </div>
              </div>
            </div>  
          </form>

        );
    }
}

HomeCmp.propTypes = {
    fetchData: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    authenticationError: PropTypes.bool.isRequired,
    authenticationRequested: PropTypes.bool.isRequired,
    isReady: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        skills: state.homeReducer.skills,
        hasErrored: state.homeReducer.hasErrored,
        isAuthenticated: state.homeReducer.isAuthenticated,
        authenticationError: state.homeReducer.authenticationError,
        authenticationRequested: state.homeReducer.authenticationRequested,
        isLoading: state.homeReducer.isLoading,
        isReady: state.homeReducer.isReady,
        formData: state.homeReducer.formData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(getSkills()),
        login: (user) => dispatch(login(user)),
        updateField: (field, value) => dispatch(updateProperty(field,value)),
        addNewSKill: (value) => dispatch(addAdditionalSKill(value)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeCmp);
