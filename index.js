function TaskLimit (limit) {
   this.taskList = []
   this.count = 0
   this.limit = limit
}

const list = Array.from({ length: 100 }).map((item, index) => () => new Promise((resolve) => {
   console.log('list '+ index +' go')
   setTimeout(() => {
       resolve('list '+ index +' done')
   }, (index + 1) * 1000)
}))

TaskLimit.prototype.scanning = function (fn) {
   const { count, limit } = this
   if (count < limit) {
       return this.run(fn)
   } else {
       return this.hold(fn)
   }
}

TaskLimit.prototype.run = function (fn) {
   this.count++
   return fn().then(data => {
       this.count--
       this.wakeUp()
       return data
   })
}

TaskLimit.prototype.hold = function (fn) {
   return new Promise((resolve, reject) => {
       this.taskList.push({fn, resolve, reject})
   })
}

TaskLimit.prototype.wakeUp = function () {
   const { count, limit, taskList } = this
   if (count < limit && taskList.length) {
       const { fn, resolve, reject } = taskList.shift()
       this.run(fn).then(resolve).catch(reject)
   }
}

Promise.map = function (list, limit) {
   const taskLimit = new TaskLimit(limit)
   Promise.all(list.map(item => taskLimit.scanning(item))).then((data) => {
       console.log(data)
   })
}

Promise.map(list, limit)
