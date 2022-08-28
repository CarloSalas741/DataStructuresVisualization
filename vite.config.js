import vitePugPlugin from 'vite-plugin-pug-transformer';

const locals = {
    menuItems : ['Stack',"Queue","Linked List","Bubble Sort"]
}

export default {
  plugins: [vitePugPlugin({pugLocals: locals})],
};