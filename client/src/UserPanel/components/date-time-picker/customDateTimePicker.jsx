import React, { useState, useEffect } from 'react'
import SnoozeIcon from '@material-ui/icons/Snooze'
import AlarmIcon from '@material-ui/icons/AddAlarm'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { IconButton, InputAdornment } from '@material-ui/core'
import { alpha } from '@material-ui/core/styles'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

function CustomDateTimePicker(props) {
  const [selectedDate, setSelectedDate] = useState(null)

  //   useEffect(() => {

  //   }, [selectedDate])
  const handleDateChange = (e) => {
    props.handleDateChange(e)
    setSelectedDate(e)
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}
    style={{color:'#fff'}}
    >
      <DateTimePicker
      
        autoOk
        hideTabs
        ampm={false}
        value={selectedDate}
        onChange={handleDateChange}
        allowKeyboardControl={false}
        minDate={new Date('2019-01-01')}
        maxDate={new Date('2100-01-01')}
        leftArrowIcon={<AlarmIcon />}
        leftArrowButtonProps={{ 'aria-label': 'Prev month' }}
        rightArrowButtonProps={{ 'aria-label': 'Next month' }}
        rightArrowIcon={<SnoozeIcon />}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton style={{color:'#fff'}}>
                <AlarmIcon  />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default CustomDateTimePicker
