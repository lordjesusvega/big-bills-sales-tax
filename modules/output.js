const fs = require('fs');
const input = require('../modules/input').input;
const input_parser = require('../modules/input_parser').input_parser;
const total = require('../modules/total').total;


const output = (function() {
  return {
    handleInput: function() {
      let user_input = input.capture_input();
      let file_path = this.input_to_file_path(user_input);
      let file = input_parser.load_doc(file_path);
      let doc = input_parser.retrieve_and_ready(file_path);
      console.log(`\nYour order looks like this:\n${file}`)
      this.updatePrice(doc);
      total.finalize_tab(doc);
    },
    header: function() {
      console.log("########################################");
      console.log("### Big Bill's Sales Tax Calculator ####");
      console.log("########################################\n");
    },
    listFiles: function(file) {
      let files = this.readFiles();
      files.forEach((curr, index) => {
        console.log(`${index + 1}. ${curr}`);
      });
    },
    input_to_file_path: function(input) {
      let files = this.readFiles();
      return `./receipts/${files[input - 1]}`;
    },
    readFiles: function() {
      let receipts_dir = './receipts/';
      let files = [];
      fs.readdirSync(receipts_dir).forEach(file => {
        files.push(file);
      });
      return files;
    },
    updatePrice: function(doc) {
      total.getTotal(doc);
      doc.map(curr => {
        curr.price = curr.original_price + curr.sales_tax();
      });
    },
    run: function() {
      this.readFiles();
      this.header();
      this.listFiles();
      this.handleInput();
    }
  }
})();


module.exports.output = output;
