import React from 'react';
import { Table, Menu, Pagination } from 'semantic-ui-react';
import './Permissions.css';

export default function Permissions(props) {
  // console.log('permissionsObj by props', props.permissionsObj);

  const NumOfItemsShownOnPage = 12;
  const totalPages = Math.ceil(
    props.permissionsObj.length / NumOfItemsShownOnPage
  );

  let permissionsList;

  if (!!props.permissionsObj) {
    permissionsList = props.permissionsObj.map((item, i) => {
      if (
        (props.pageNumber - 1) * NumOfItemsShownOnPage <= i &&
        i < props.pageNumber * NumOfItemsShownOnPage
      ) {
        return (
          <Table.Row key={i}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell>{item.href}</Table.Cell>
          </Table.Row>
        );
      } else {
        return '';
      }
    });
  }

  return (
    <div className="maintable">
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Ref_Link</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{permissionsList} </Table.Body>

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
    </div>
  );
}
