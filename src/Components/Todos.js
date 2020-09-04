render() {
    return (
        <>
            {/* button row */}
            <div className="row">
                <div className="col-6">
                    <button className={(this.props.filter === 'all')?'active':''} onClick={this.showAllTask}>All</button>
                    <button className={(this.props.filter === 'active')?'active':''} onClick={this.showNoncompleteTask}>Active</button>
                    <button className={(this.props.filter === 'completed')?'active':''} onClick={this.showCompleteTask}>Completed</button>
                </div>
                <div className="col-6 text-right">
                    <button className="Add" onClick={this.showOverlayForm}>Add Task</button> {/*will name a pop-up overlay*/}
                </div>
            </div>
             {/* table row */}
            <div className="row">
               <div className="col-12">
                   <div id="list">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Task Description </th>
                                    <th scope="col">Assigned To</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Mark Complete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.showTodoList() }
                            </tbody>
                        </table>
                   </div>
                </div>
            </div>
             {/* m row */}
            { this.controlFormVisibility() }
        </>

    )
}
}