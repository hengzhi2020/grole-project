import React from 'react';
import { Tab, Table, Menu, Pagination } from 'semantic-ui-react';
import './Roles.css';

export default function Roles(props) {
  // console.log('rolesObj passing to Roles-componenent: ', props.rolesObj);

  const usersNumOnePage = 12;
  const totalPages = Math.ceil(props.rolesObj.length / usersNumOnePage);
  let usersList;

  if (!!props.rolesObj) {
    usersList = props.rolesObj.map((item, i) => {
      if (
        (props.pageNumber - 1) * usersNumOnePage <= i &&
        i < props.pageNumber * usersNumOnePage
      ) {
        return (
          <Table.Row key={i}>
            <Table.Cell>{item.username}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.company.name}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>{item.phone}</Table.Cell>
            <Table.Cell>{item.website}</Table.Cell>
          </Table.Row>
        );
      } else {
        return '';
      }
    });
  }

  let exampleTable = (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User Name</Table.HeaderCell>
          <Table.HeaderCell>Full Name</Table.HeaderCell>
          <Table.HeaderCell>Company Name</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
          <Table.HeaderCell>Phone Number</Table.HeaderCell>
          <Table.HeaderCell>Registration Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{usersList}</Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="9">
            <Menu floated="right">
              <Pagination
                onPageChange={props.pageSelector}
                defaultActivePage={0}
                totalPages={totalPages}
                ellipsisItem={null}
                // firstItem={null}
                // lastItem={null}
                siblingRange={9}
              />
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );

  const panes = [
    {
      menuItem: 'Systems Architect',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: 'System Administrator',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: 'Research Director',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: 'Project Manager',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: 'Web Developer',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: 'VA MVP User',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: 'VA non-MVP User',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: 'Regular User',
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
  ];

  return (
    <div>
      <Tab
        menu={{ fluid: false, vertical: false, tabular: true }}
        panes={panes}
      />
    </div>
  );
}
