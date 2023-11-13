            //       {/* A. FILE */}
            //       <label> File:
            //       <input type="file" 
            //           name="myFile"
            //           accept=".gif,.png, .jpg"
            //           onChange={ e => setObj( 
            //              // -----------------------------------------------
            //               // get the rest of the object
            //                   {...obj, 
            //                       // change the myFile attribute
            //                       myFile : 
            //                           // add the file itself
            //                           [e.target.files[0], 
            //                           // make a blob url to display on page
            //                           URL.createObjectURL(e.target.files[0])] 
            //                   })
            //              // -----------------------------------------------
            //           } />
            //           {/* B. SHOW THE IMAGE */}
            //           {
            //               // short circut to see if there is a value in the second index
            //               // this means a file was found and saved
            //               // -----------------------------------------------
            //               obj.myFile[1] &&
            //                   <div>
            //                       <img src={obj.myFile[1]} 
            //                           alt="Selected File" 
            //                           style={{width: "20vw", maxWidth:"300px" }}/>
            //                   </div>
            //              // -----------------------------------------------
            //           }
            //   </label>