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
    api.add(task)
  });

  
program.parse(process.argv);