import React from "react";
import { observer } from "mobx-react-lite";
import { Checkbox, Grid, Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/Styles";

const CheckBoxes = ({ store, data, indicators = {}, type = "checkbox" }) => {
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
    store.updateIndicators({ name: e.target.name, value: e.target.checked });
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexDirection: "row",
    },
  }));
  const classes = useStyles();

  return (
    <Grid container flexDirection="row">
      <h5>{heading}</h5>
      {type === "checkbox" ? (
        <Checkbox
          id={htmlId}
          onClick={selAll}
          label
          className="form-check-label"
          value="select-all"
        ></Checkbox>
      ) : null}

      {labels.map((label, index) => {
        const [key, tmp, disabled] = label;
        return (
          <Grid container>
            {type === "checkbox" ? (
              <Checkbox
                type="checkbox"
                id={htmlId + "-" + index}
                disabled={disabled}
                onChange={updateIndicators}
                className={`form-check-input ${htmlId}`}
                name={key}
                checked={indicators[key]}
              />
            ) : (
              <Radio
                type="radio"
                id={htmlId + "-" + index}
                disabled={disabled}
                name={heading}
                value={tmp}
                onChange={updateIndicators}
              />
            )}
            <td>
              <label className="form-check-label"> {tmp}</label>
            </td>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default observer(CheckBoxes);
