import React from 'react';
import { Table, Menu, Icon, Dropdown, Pagination } from 'semantic-ui-react';
import './Roles.css';

export default function Roles(props) {
  // console.log('rolesObj passing to Roles-componenent: ', props.rolesObj);

  const NumOfItemsShownOnPage = 12;
  const totalPages = Math.ceil(props.rolesObj.length / NumOfItemsShownOnPage);
  let roleUsers;
  let rolesList = [];

  if (!!props.rolesObj) {
    props.rolesObj.map((item, i) => {
      rolesList.push({ key: i, text: item.name, value: item.name });
    });
  }

  if (!!props.rolesObj) {
    roleUsers = props.rolesObj.map((item, i) => {
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

      <Table.Body>{roleUsers}</Table.Body>

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

  return (
    <div>
      <div className="selector-at-top-right">
        <span>
          {'Select Role '}
          <Dropdown
            id="role-dropdown"
            inline
            options={rolesList}
            defaultValue={rolesList[0].value}
          />
          {' for Users'}
        </span>
      </div>
      {exampleTable}
    </div>
  );
}
