import React from 'react';
import { Tab, Table, Menu, Pagination } from 'semantic-ui-react';
import './Roles.css';

export default function Roles(props) {
  // console.log('rolesObj passing to Roles-componenent: ', props.rolesObj);

  const NumOfItemsShownOnPage = 12;
  const totalPages = Math.ceil(props.rolesObj.length / NumOfItemsShownOnPage);
  let rolesList;

  if (!!props.rolesObj) {
    rolesList = props.rolesObj.map((item, i) => {
      if (
        (props.pageNumber - 1) * NumOfItemsShownOnPage <= i &&
        i < props.pageNumber * NumOfItemsShownOnPage
      ) {
        return (
          <Table.Row key={i}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell>{item.access_list}</Table.Cell>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.id}</Table.Cell>
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
          <Table.HeaderCell>UserName</Table.HeaderCell>
          <Table.HeaderCell>FullName</Table.HeaderCell>
          <Table.HeaderCell>Affiliation</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Created</Table.HeaderCell>
          <Table.HeaderCell>Updated</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{rolesList}</Table.Body>

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
      menuItem: (
        <Menu.Item key="Systems Architect">
          <p className="item-selected">Role_List_01</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="System Administrator">
          <p className="item-selected">Role_List_02</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="Research Director">
          <p className="item-selected">Role_List_03</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="Project Manager">
          <p className="item-selected">Role_List_04</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="Web Developer">
          <p className="item-selected">Role_List_05</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="VA MVP User">
          <p className="item-selected">Role_List_06</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="VA Non-MVP User">
          <p className="item-selected">Role_List_07</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="Regular User">
          <p className="item-selected">Role_List_08</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="Regular User">
          <p className="item-selected">Role_List_09</p>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{exampleTable}</Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key="Regular User">
          <p className="item-selected">Role_List_10</p>
        </Menu.Item>
      ),
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
