const express = require("express");
const catalystSDK = require("zcatalyst-sdk-node");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

const fetchAll = async (req, res) => {
    try {
      const { catalyst } = res.locals;
    
      const zcql = catalyst.zcql();
      const hasMore = await zcql.executeZCQLQuery(`SELECT *FROM TodoItems`)
  
        res.status(200).send({
          status: "success",
          data: hasMore
        })
        
    } catch (err) {
      console.log(err);
      res.status(500).send({
        status: "failure",
        message: "We're unable to process the request.",
      });
    }
};
  
const AddTask=async (req, res) => {
try {
    const { notes } = req.body;
    const { catalyst } = res.locals;
    const table = catalyst.datastore().table("TodoItems");
    const { ROWID: id } = await table.insertRow({
    Notes: notes,
    });
    res.status(200).send({
    status: "success",
    data: {
        todoItem: {
        id,
        notes,
        },
    },
    });
} catch (err) {
    console.log(err);
    res.status(500).send({
    status: "failure",
    message: "error in adding",
    });
}
};

const deleteTask= async (req, res) => {
try {
    const { ROWID } = req.params;
    const { catalyst } = res.locals;
    const table = catalyst.datastore().table("TodoItems");
    await table.deleteRow(ROWID);
    res.status(200).send({
    status: "success",
    data: {
        todoItem: {
        id: ROWID,
        },
    },
    });
} catch (err) {
    console.log(err);
    res.status(500).send({
    status: "failure",
    message: "Error in deleting.",
    });
}
};

const updateTask=async (req, res) => {
try {
    const { ROWID } = req.params; 
    const { notes } = req.body; 
    const { catalyst } = res.locals;
    const table = catalyst.datastore().table("TodoItems");

    await table.updateRow({
    ROWID,
    Notes: notes,
    });

    res.status(200).send({
    status: "success",
    data: {
        todoItem: {
        id: ROWID,
        notes,
        },
    },
    });
} catch (err) {
    console.error(err);

    res.status(500).send({
    status: "failure",
    message: "Error in updating",
    });
}
};


// const searchTask = async (req, res) => {
//   const searchData = req.query.searchData;
//   console.log(`Search Data: ${searchData}`);

//   try {
//     const { catalyst } = res.locals;
//     const zcql = catalyst.zcql();

//     const query = `SELECT * FROM TodoItems`;
//     const result = await zcql.executeZCQLQuery(query);

//     const filteredData = result.filter((item) =>
//       item.TodoItems.Notes && item.TodoItems.Notes.includes(searchData)
//     );

//     res.status(200).send({
//       status: "success",
//       data: filteredData,
//     });
//   } catch (err) {
//     console.error("Error executing ZCQL query: ", err);

//     res.status(500).send({
//       status: "failure",
//       message: "Error searching tasks",
//       error: err.message,
//     });
//   }

// };

const searchTask = async (req, res) => {
  const searchData = req.query.searchData; 
  console.log(`Search Data: ${searchData}`);

  try {
    const { catalyst } = res.locals;
    const searchQuery = {
      "search": searchData,
      "search_table_columns": {
        "TodoItems": ["Notes"],
      },
    };

    console.log(searchQuery)

    const result = await catalyst.search().executeSearchQuery(searchQuery).then(resp =>{
      console.log("response is here",resp);

        // Respond with the search results
        res.status(200).send({
          status: "success",
          message: "Search completed successfully",
          data: resp,
        });
      
      }).catch(err =>{
        console.log("err",err);
        res.status(500).send({
          status: "failure",
          message: "Error searching tasks",
          error: err.message,
        });
      });
    // console.log(result);
  } catch (err) {
        console.log("err",err);
        res.status(500).send({
          status: "failure",
          message: "Error searching tasks",
          error: err.message,
        });
  }
};


module.exports={fetchAll,AddTask,deleteTask,updateTask,searchTask};