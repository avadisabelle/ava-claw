package ai.avaclaw.app.ui

import androidx.compose.runtime.Composable
import ai.avaclaw.app.MainViewModel
import ai.avaclaw.app.ui.chat.ChatSheetContent

@Composable
fun ChatSheet(viewModel: MainViewModel) {
  ChatSheetContent(viewModel = viewModel)
}
