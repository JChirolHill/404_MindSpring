import React from 'react';

export default function SettingsTab(props) {
  function switchMode() {
    props.onChangeMode(!props.darkmode);
  }

  return (
    <div id="settings_tab" onClick={switchMode}>
      {props.darkmode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
    </div>
  );
}
