export { SchemaList } from './schema-list';
export { SchemaViewer } from './schema-viewer';
export { SchemaBuilder } from './schema-builder';

// export const Scheme: React.FC = () => {
//   return (
//     <div className='scheme-view'>
//       <NavLink
//         to="/schema-viewer"
//         className={({ isActive }) =>
//           isActive ? " menu-item active-menu-item" : "menu-item"
//         }
//       >
//         Schema Viewer
//       </NavLink>
//       <NavLink
//         to="/schema-builder"
//         className={({ isActive }) =>
//           isActive ? " menu-item active-menu-item" : "menu-item"
//         }
//       >
//         Schema Builder
//       </NavLink>
//       <SchemaViewer></SchemaViewer>
//       <SchemaBuilder></SchemaBuilder>
//     </div>
//   );
// };