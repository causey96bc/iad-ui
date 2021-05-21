import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const SearchResults = ({ store, config }) => (
  <div className="row results">
    <div className="locations col row">
      <span>
        <h4>Agencies</h4>
      </span>
      <table className="table table-sm table-hover table-borderless">
        <thead>
          <th>
            <input
              type="checkbox"
              className="form-check-input"
              id="locations-sel-all"
              title="select all"
            />
          </th>
          <th>
            <label for="locations-sel-all" className="form-check-label">
              code
            </label>
          </th>
          <th>
            <label for="locations-sel-all" className="form-check-label">
              account
            </label>
          </th>
          <th>
            <label for="locations-sel-all" className="form-check-label">
              name
            </label>
          </th>
        </thead>
        <tbody>
          {store.matches.map((row, key) => {
            return (
              <tr onClick={() => store.setActive(toJS(row))}>
                <td>
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td>{row.agency_code}</td>
                <td>{row.ivans_account}</td>
                <td>{row.agency_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="col details">
      <h4>Agency Details</h4>
      <div className="details">
        <p>Some details ... from IVANS/PMACS/AIDB</p>
        {store.active && (
          <ul>
            <li>Last Update: {store.active.last_upd_date}</li>
            <li>Machine Address: {store.active.ibm_machine_address}</li>
          </ul>
        )}
      </div>
    </div>
  </div>
);
export default observer(SearchResults);
