import React from 'react';
import {
  Table,
  Menu,
  Popup,
  Header,
  Button,
  Pagination,
} from 'semantic-ui-react';
import './Users.css';

export default function Users(props) {
  // console.log("usersObj passing to User-componenent: ", props.usersObj);
  // console.log("selected page number is ", props.pageNumber);

  const usersNumOnePage = 12;
  const totalPages = Math.ceil(props.usersObj.length / usersNumOnePage);
  let usersList;

  if (!!props.usersObj) {
    usersList = props.usersObj.map((item, i) => {
      //  console.log("i = ", i);
      if (
        (props.pageNumber - 1) * usersNumOnePage <= i &&
        i < props.pageNumber * usersNumOnePage
      ) {
        return (
          <Table.Row key={i}>
            <Table.Cell>{item.login}</Table.Cell>
            <Table.Cell>
              {item.node_id}
              <Popup
                content={
                  <Table basic="very" celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Role</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          {' '}
                          <ol>
                            <li>Systems architect</li>
                            <li>System Administrator</li>
                            <li>Web Developer</li>
                          </ol>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Support</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>'{item.support}'</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Presenter</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>'{item.project_presenter}'</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>CreateTime</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>'{item.created_at}'</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                trigger={<Button className="mini compact button" icon="add" />}
              />
            </Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.login}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.node_id}</Table.Cell>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>
              <a href="" id="Nav-tab">
                Details
              </a>{' '}
              |{' '}
              <a href="" id="Nav-tab">
                History
              </a>
            </Table.Cell>
          </Table.Row>
        );
      } else {
        return '';
      }
    });
  }

  return (
    <div>
      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User_ID</Table.HeaderCell>
            <Table.HeaderCell>User_Name</Table.HeaderCell>
            <Table.HeaderCell>User_Email</Table.HeaderCell>
            <Table.HeaderCell>User_Affiliation</Table.HeaderCell>
            <Table.HeaderCell>User_Type</Table.HeaderCell>
            <Table.HeaderCell>Account_Type</Table.HeaderCell>
            <Table.HeaderCell>Account_Created</Table.HeaderCell>
            <Table.HeaderCell>Account_Updated</Table.HeaderCell>
            <Table.HeaderCell>More information</Table.HeaderCell>
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
    </div>
  );
}
