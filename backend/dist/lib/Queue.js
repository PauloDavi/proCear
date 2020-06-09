"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _beequeue = require('bee-queue'); var _beequeue2 = _interopRequireDefault(_beequeue);

var _ConfirmationMail = require('../app/jobs/ConfirmationMail'); var _ConfirmationMail2 = _interopRequireDefault(_ConfirmationMail);
var _NotificationMail = require('../app/jobs/NotificationMail'); var _NotificationMail2 = _interopRequireDefault(_NotificationMail);
var _RecoverPassMail = require('../app/jobs/RecoverPassMail'); var _RecoverPassMail2 = _interopRequireDefault(_RecoverPassMail);
var _redis = require('../config/redis'); var _redis2 = _interopRequireDefault(_redis);

const jobs = [_ConfirmationMail2.default, _NotificationMail2.default, _RecoverPassMail2.default];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new (0, _beequeue2.default)(key, {
          redis: _redis2.default,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

exports. default = new Queue();
