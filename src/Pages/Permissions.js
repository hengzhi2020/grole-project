import React from 'react';
import { Table } from 'semantic-ui-react';
import './Permissions.css';

export default function Permissions(props) {
  console.log(
    'permissionsObj passing to Permissions-componenent: ',
    props.permissionsObj
  );

  let roleList;

  roleList = props.permissionsObj.map((item, i) => {
    return (
      <Table.Cell key={i}>
        <ol>
          <li>{item.name} </li>
          <li> {item.username}</li>
          <li>{item.company.catchPhrase}</li>
          <li> {item.email}</li>
          <li> {item.phone}</li>
          <li> {item.website}</li>
          <li> {item.company.name}</li>
        </ol>
      </Table.Cell>
    );
  });

  return (
    <div className="maintable">
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Permission</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Systems Architect</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes you don't
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes like;
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>System Administrator</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything ye;
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Research Director</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everon't really have enough room to
                  describe everything you'd like;
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Project Manager</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everyou'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes you don't really have enough
                  room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Web Developer</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes you don't really have enough
                  room to describe everything you'd like;
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>VA MVP User</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes you don't really have enough
                  room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like; John is an
                  interesting boy but sometimes you don't really have enough
                  room to describe everything you'd like;
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>VA non-MVP User</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Regular User</Table.Cell>
            <Table.Cell>
              <ol>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;
                </li>
                <li>
                  John is an interesting boy but sometimes you don't really have
                  enough room to describe everything you'd like;g boy but
                  sometimes you don't really have enough room to describe everyt
                </li>
              </ol>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
