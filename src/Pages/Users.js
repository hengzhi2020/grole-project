import React from 'react';
import './Users.css';
import {
  Table,
  Menu,
  Popup,
  Header,
  Button,
  Pagination,
} from 'semantic-ui-react';

export default function Users(props) {
  // console.log("usersObj passing to User-componenent: ", props.usersObj);
  // console.log("selected page number is ", props.pageNumber);

  const NumOfItemsShownOnPage = 12;
  const totalPages = Math.ceil(props.usersObj.length / NumOfItemsShownOnPage);

  let usersList;

  if (!!props.usersObj) {
    usersList = props.usersObj.map((item, i) => {
      //  console.log("i = ", i);
      if (
        (props.pageNumber - 1) * NumOfItemsShownOnPage <= i &&
        i < props.pageNumber * NumOfItemsShownOnPage
      ) {
        return (
          <Table.Row key={i}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.username}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>{item.href}</Table.Cell>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>
              Acc_{item.id}
              <Popup
                content={
                  <Table basic="very" celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>AccType</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Created</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Updated</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Status</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                trigger={<Button className="mini compact button" icon="add" />}
              />
              , Acc_{item.id + 1}
              <Popup
                content={
                  <Table basic="very" celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>AccType</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Created</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Updated</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Status</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                trigger={<Button className="mini compact button" icon="add" />}
              />
              , Acc_{item.id + 2}
              <Popup
                content={
                  <Table basic="very" celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>AccType</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Created</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Updated</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Status</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                trigger={<Button className="mini compact button" icon="add" />}
              />
            </Table.Cell>
            <Table.Cell>
              Role_{item.id}
              <Popup
                content={
                  <Table basic="very" celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>RoleType</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Created</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Updated</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Status</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                trigger={<Button className="mini compact button" icon="add" />}
              />
              , Role_{item.id + 1}
              <Popup
                content={
                  <Table basic="very" celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>RoleType</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Created</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Updated</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Status</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                trigger={<Button className="mini compact button" icon="add" />}
              />
              , Role_{item.id + 2}
              <Popup
                content={
                  <Table basic="very" celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>RoleType</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Created</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Updated</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>Status</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{'hard-coded'}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                trigger={<Button className="mini compact button" icon="add" />}
              />
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
            <Table.HeaderCell>
              <p className="table-header">UserID</p>
            </Table.HeaderCell>
            <Table.HeaderCell>UserName</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Affiliation</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Accounts</Table.HeaderCell>
            <Table.HeaderCell>Roles</Table.HeaderCell>
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
