const { program } = require('commander');
const api = require('./index.js')

program
  .option('-d, --debug', 'output extra debugging')


program
  .command('add <task>')
  .description('add a task')
  .action((task) => {
    //   const wroks = args.slice(0,-1).join(" ")
    // var  args = args.slice(0,1).join(" ")
    api.add(task).then(()=>{console.log(`添加任务成功`)},()=>{console.log(`添加任务失败`)})
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    //   const wroks = args.slice(0,-1).join(" ")
    // var  args = args.slice(0,1).join(" ")
    api.clear().then(()=>{console.log(`清除完毕`)},()=>{console.log(`清除失败`)})
  });


if(process.argv.length===2){
  // 说明用户直接运行 node cli.js
  api.showAll()
}

program
  .command('check')
  .description('clear all tasks')
  .action(() => {
    api.showAll( )
  });
  
  program.parse(process.argv);
