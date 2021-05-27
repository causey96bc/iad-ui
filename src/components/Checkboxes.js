import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/Styles";

const CheckBoxes = ({ store, data, indicators = {}, type = "checkbox" }) => {
  const [htmlId, heading, labels] = data;
  const selAll = (e) => {
    const checked = e.target.checked;
     let checkedArray = document.querySelectorAll(`input[id^="${e.target.id}"]:not(#${e.target.id})`)
     store.selectAll(Array.from(checkedArray).map((elem) => {
      return elem.name;
    }), checked)
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
      <FormControl>
        <h5>{heading}</h5>
        {type === "checkbox" ? (
          <FormControlLabel label="Select All" control={<Checkbox
            id={htmlId}
            onClick={selAll}
            className={`${htmlId}`}
          ></Checkbox>}/>
        ) : null}

        {labels.map((label, index) => {
          const [key, tmp, disabled] = label;
          return (
            <Grid container>
              {type === "checkbox" ? (
                <FormControlLabel
                  label={tmp}
                  control={
                    <Checkbox
                      type="checkbox"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      onChange={updateIndicators}
                      // inputProps={{class: htmlId}}
                      name={key}
                      checked={indicators[key]}
                    />
                  }
                />
              ) : (
                <FormControlLabel
                  label={tmp}
                  control={
                    <Radio
                      type="radio"
                      id={htmlId + "-" + index}
                      disabled={disabled}
                      name={heading}
                      value={tmp}
                      onChange={updateIndicators}
                    />
                  }
                />
              )}
            </Grid>
          );
        })}
      </FormControl>
    </Grid>
  );
};

export default observer(CheckBoxes);
