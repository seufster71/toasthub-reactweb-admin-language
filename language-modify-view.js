import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextBuilder from '../../coreView/common/text-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import SelectBuilder from '../../coreView/common/select-input-builder';
import Switch from '../../coreView/common/switch';

export default function LanguageModifyView({itemState, appPrefs, 
	onSave, onCancel, inputChange}) {
    
	let adminLanguageFormTitle = {};

    let adminLanguageFormCode = {};
    
    let adminLanguageFormActive = {};
    let activeDefault = true;
    let activeOptions = [];
    
    let adminLanguageFormDefault = {};
    let defaultDefault = true;
    let defaultOptions = [];
    
    let adminLanguageFormDirection = {};
    
    if (itemState.prefForms != null && itemState.prefForms.ADMIN_LANGUAGE_FORM != null) {
    	let formItems = itemState.prefForms.ADMIN_LANGUAGE_FORM;
    	for (let i = 0; i < formItems.length; i++) {
    		switch (formItems[i].name) {
    		case "ADMIN_LANGUAGE_FORM_TITLE":
    			adminLanguageFormTitle = formItems[i];
    			break;
    		case "ADMIN_LANGUAGE_FORM_CODE":
    			adminLanguageFormCode = formItems[i];
    			break;
    		case "ADMIN_LANGUAGE_FORM_ACTIVE":
    			adminLanguageFormActive = formItems[i];
    			if (adminLanguageFormActive.value != "") {
    				let valueObj = JSON.parse(adminLanguageFormActive.value);
    				if (valueObj.options != null) {
    					activeOptions = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
    						let value = JSON.parse(pref.value);
    						if (value.options != null) {
    							activeOptions = value.options;
    						}
    					}
    				}
    			}
    			break;
    		case "ADMIN_LANGUAGE_FORM_DEFAULT":
    			adminLanguageFormDefault = formItems[i];
    			if (adminLanguageFormDefault.value != "") {
    				let valueObj = JSON.parse(adminLanguageFormDefault.value);
    				if (valueObj.options != null) {
    					defaultOptions = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
    						let value = JSON.parse(pref.value);
    						if (value.options != null) {
    							defaultOptions = value.options;
    						}
    					}
    				}
    			}
    			break;
    		case "ADMIN_LANGUAGE_FORM_DIRECTION":
    			adminLanguageFormDirection = formItems[i];
    			break;
    		}
    	}
    }
    return (
    	<div className="col-lg-12">
    		
			<h4 className="modal-title">Language</h4>

			<div className="row">
				<div className="col-sm-4">
					<MultiLangTextInput field={adminLanguageFormTitle} itemState={itemState} inputChange={inputChange} appPrefs={appPrefs}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<TextBuilder itemState={itemState} field={adminLanguageFormCode} inputChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<SelectBuilder itemState={itemState} field={adminLanguageFormDirection} inputChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<Switch itemState={itemState} field={adminLanguageFormActive} inputChange={inputChange} options={activeOptions}/>
				</div>
			</div>	
			<div className="row">
				<div className="col-md-4">
					<Switch itemState={itemState} field={adminLanguageFormDefault} inputChange={inputChange} options={defaultOptions}/>
				</div>
			</div>
			
			<button type="button" className="btn btn-primary" onClick={() => onSave()}>Save</button>
			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onCancel()}>Cancel</button>
    	</div>
    );
}


LanguageModifyView.propTypes = {
  itemState: PropTypes.object.isRequired,
  appPrefs: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired
};
