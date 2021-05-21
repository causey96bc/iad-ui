import React from "react";
import { observer } from "mobx-react-lite";

const CheckBoxes = ({
  store,
  data,
  indicators = {},
  type = "checkbox",
}) => {
  const [htmlId, heading, labels] = data;
  const selAll = (e) => {
    const checked = e.target.checked;
    document.querySelectorAll("." + e.target.id).forEach((elem) => {
      if (elem.disabled === true) {
      } else {
        elem.checked = checked;
      }
    });
  };
  const updateIndicators = (e) => {
    store.updateIndicators({'name': e.target.name, 'value': e.target.checked});
  }

  return (
    <div className="container">
      <h5>{heading}</h5>
      <table className="table table-sm table-borderless">
        {type === "checkbox" ? (
          <thead>
            <tr className="form-check">
              <th>
                <input
                  type="checkbox"
                  id={htmlId}
                  className="form-check-input"
                  onClick={selAll}
                />
              </th>
              <th>
                <label className="form-check-label">select all</label>
              </th>
            </tr>
          </thead>
        ) : null}
        <tbody>
          {labels.map((label, index) => {
            const [key, tmp, disabled ] = label;
            return (
              <tr className="form-check">
                <td>
                  {type === "checkbox" ? (
                    <input
                      type="checkbox"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      onChange={updateIndicators}
                      className={`form-check-input ${htmlId}`}
                      name={key}
                      checked={indicators[key]}
                    />
                  ) : (
                    <input
                      type="radio"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      name={heading}
                      value={tmp}
                      onChange={updateIndicators}
                      className="form-check-input"
                    />
                  )}
                </td>
                <td>
                  <label className="form-check-label"> {tmp}</label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default observer(CheckBoxes);