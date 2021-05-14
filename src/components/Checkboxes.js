import React from "react";

const CheckBoxes = ({
  data,
  indicators = {},
  type = "checkbox",
  updateIndicators,
}) => {
  const [htmlId, heading, labels] = data;
  // console.log("data", data);
  // console.log("indicators", indicators);
  const selAll = (e) => {
    const checked = e.target.checked;
    document.querySelectorAll("." + e.target.id).forEach((elem) => {
      if (elem.disabled === true) {
      } else {
        elem.checked = checked;
      }
    });
  };
  return (
    <div class="container">
      <h5>{heading}</h5>
      <table class="table table-sm table-borderless">
        {type === "checkbox" ? (
          <thead>
            <tr class="form-check">
              <th>
                <input
                  type="checkbox"
                  id={htmlId}
                  class="form-check-input"
                  onClick={selAll}
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
            const [key, tmp, disabled, value] = label;
            // console.log("key", key, indicators[key]);
            return (
              <tr class="form-check">
                <td>
                  {type === "checkbox" ? (
                    <input
                      type="checkbox"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      onChange={updateIndicators}
                      className={`form-check-input ${htmlId}`}
                      name={key}
                      checked={indicators[key] == 'D'}
                    />
                  ) : (
                    <input
                      type="radio"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      name={heading}
                      value={tmp}
                      onChange={updateIndicators}
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
    </div>
  );
};

export default CheckBoxes;
