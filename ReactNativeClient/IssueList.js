import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { enableScreens } from 'react-native-screens';
const Tab = createBottomTabNavigator();

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) {
      return new Date(value);
    }
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://192.168.1.5:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
  render() {
    return (
      <View style={styles.placeholder}>
        <Text>This is a placeholder for the issue filter.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#3b5998',
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1, // Each cell takes equal space
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1, // Adjust this for equal spacing
    textAlign: 'center',
  },
});


const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    {/****** Q2: Coding Ends here.******/}
    return (
      <View style={styles.row}>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
        <Text style={styles.cell}>{issue.id}</Text>
        <Text style={styles.cell}>{issue.status}</Text>
        <Text style={styles.cell}>{issue.owner}</Text>
        <Text style={styles.cell}>{issue.created.toDateString()}</Text>
        <Text style={styles.cell}>{issue.effort}</Text>
        <Text style={styles.cell}>{issue.due ? issue.due.toDateString() : ''}</Text>
        <Text style={styles.cell}>{issue.title}</Text>
      {/****** Q2: Coding Ends here. ******/}  
      </View>
    );
  }
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const renderTableHeader = () => (
        <View style={styles.header}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>Owner</Text>
          <Text style={styles.headerCell}>Created</Text>
          <Text style={styles.headerCell}>Effort</Text>
          <Text style={styles.headerCell}>Due Date</Text>
          <Text style={styles.headerCell}>Title</Text>
        </View>
    );
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
        <View style={styles.container}>
          {renderTableHeader()}
          {issueRows}
        </View>
      );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = { owner: '', title: '', effort: '' };
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const { owner, title, effort } = this.state;
          const issue = {
            owner,
            title,
            effort: parseInt(effort, 10),
            due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
          };
          this.props.createIssue(issue);
          this.setState({ owner: '', title: '', effort: '' });
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
            <TextInput
              style={styles.input}
              placeholder="Owner"
              value={this.state.owner}
              onChangeText={(text) => this.setState({ owner: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={this.state.title}
              onChangeText={(text) => this.setState({ title: text })}
             />
             <TextInput
                style={styles.input}
                placeholder="Effort"
                value={this.state.effort}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ effort: text })}
                />
             <Button title="Add" onPress={this.handleSubmit} />
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = { owner: ''};
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
        const { owner } = this.state;
        const blackRecord = {
            owner,
        };
        console.log("record:", blackRecord);
        this.props.block(blackRecord);
        this.setState({ owner: '' });
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput
          style={styles.input}
          placeholder="Owner"
          value={this.state.owner}
          onChangeText={(text) => this.setState({ owner: text })}
        />
        <Button title="Add" onPress={this.handleSubmit} />
        {/****** Q4: Code Ends here. ******/}
        </View>
        );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
            issueList {
                id
                title
                status
                owner
                created
                effort
                due
            }
        }`;
        const data = await graphQLFetch(query);
        if (data) {
            this.setState({ issues: data.issueList });
        }

    }

    async createIssue(issue) {
        const query = `mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
            id
            }
        }`;

        const data = await graphQLFetch(query, { issue });
        if (data) {
            this.loadData();
        }
    }

    async addInBlacklist(record) {
        const query = `mutation addToBlacklist($owner: String!) {
              addToBlacklist(nameInput: $owner)
        }`;


        const data = await graphQLFetch(query, {owner: record.owner});
          if (data) {
                this.loadData();
         }
     }
    
    
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="IssueTable"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'IssueTable') {
                            iconName = 'list';
                        } else if (route.name === 'IssueFilter') {
                            iconName = 'filter';
                        } else if (route.name === 'IssueAdd') {
                            iconName = 'add-circle';
                        } else if (route.name === 'AddBlackList') {
                            iconName = 'add-circle';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    })}
                >
                <Tab.Screen name="IssueTable" options={{ title: 'Issue Table' }}>
                    {props => <IssueTable {...props} issues={this.state.issues}/>}
                </Tab.Screen>
                <Tab.Screen name="IssueFilter" component={IssueFilter}>
                </Tab.Screen>
                <Tab.Screen name="IssueAdd"  options={{ title: 'Add Issue' }}>
                     {props => (<IssueAdd {...props} createIssue={this.createIssue}/>)}
                </Tab.Screen>
                <Tab.Screen name="AddBlackList"  options={{ title: 'Block' }}>
                      {props => (<BlackList {...props} block={this.addInBlacklist}/>)}
                </Tab.Screen>
              </Tab.Navigator>
            </NavigationContainer>
    );
  }
}