import cron from 'node-cron'
import Table from './model/table.model.js'
import { logEvents } from './middleware/logEvents.js'

cron.schedule('* * * * * *', async () => {
  const now = new Date()

  try {
    const expiredTables = await Table.find({
      availability: false,
      expiresAt: { $lt: now }
    })

    // Nếu không có bàn nào hết hạn → return luôn
    if (!expiredTables || expiredTables.length === 0) {
      logEvents(`No expired tables at ${now.toISOString()}`)
      return
    }

    for (const table of expiredTables) {
      table.username = null
      table.availability = true
      table.pin = null
      table.expiresAt = now
      await table.save()

      logEvents(`Auto-cleared table ${table.tableId} at ${now.toISOString()}`)
    }
  } catch (error) {
    logEvents(`Session has expired: ${error.message}`)
  }
})
