// https://webpack.js.org/guides/typescript/#importing-other-assets
declare module '*.svg' {
  const content: React.FC<{ style: React.CSSProperties }>
  export default content
}
