import React from "react";

import {} from "module";

const CheckBoxes = ({ data, type }) => {
  console.log("data", data);
  const [htmlId, heading, labels] = data;
  console.log("head", heading);

  return (
    <div class="container">
      <h5>{heading}</h5>
      <table class="table table-sm table-borderless">
        {type === 'checkbox' ? (
          <thead>
            <tr class="form-check">
              <th>
                <input
                  type="checkbox"
                  id={htmlId}
                  class="form-check-input"
                  //   on:change={selAll}
                />
              </th>
              <th>
                <label class="form-check-label">select all</label>
              </th>
            </tr>
          </thead>
        ) : null}
        <tbody>
          {labels.map((label, index) => {
            const [key,tmp, disabled, value] = label;

            return (
              <tr class="form-check">
                <td>
                  {type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      //    bind:checked={indicators[key]}
                      class="form-check-input"
                    />
                  ) : (
                    <input
                      type="radio"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      // bind:group={indicators[key]}
                      value={value}
                      class="form-check-input"
                    />
                  )}
                </td>
                <td>
                  <label class="form-check-label"> {tmp}</label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      }
    </div>
  );
};

export default CheckBoxes;
