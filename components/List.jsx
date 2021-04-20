const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');

/**
 * 
 * @param {
 *  {
 *   item: string[]; 
 *   name: string; 
 *   selectedItem: string;
 *   onSelectItem: (item) => string
 *  }
 * }  
 * @returns {JSX.Element}
 */
module.exports = function List(props) {
  return (
    <div className="list">
      <h3>{props.name}</h3>
      <select className="list-items" size="4"
        onChange={e => props.onSelectItem(e.target.value)} value={props.selectedItem}>
        {props.item.map(item => <option value={item}>{item}</option>)}
      </select>
    </div>
  );
};