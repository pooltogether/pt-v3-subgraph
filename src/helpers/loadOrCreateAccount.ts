import { Address, BigInt, log } from '@graphprotocol/graph-ts'

import {
  Account,
  DripTokenPlayer,
  BalanceDripPlayer,
  VolumeDripPlayer,
} from '../../generated/schema'

import {
  playerId,
  dripTokenPlayerId,
  balanceDripPlayerId,
  volumeDripPlayerId,
} from './idTemplates'

import { ZERO } from './common'


export function loadOrCreateAccount(
  prizePool: Address,
  player: Address
): Account {
  const id = playerId(prizePool.toHex(), player.toHex()) // still correct?
  let _account = Account.load(id)

  if (!_account) {
    _account = new Account(id)

    _account.prizePool = prizePool.toHex()
    _account.address = player
    _account.balance = ZERO


    // how do we now know which accountType to create??
    // 


    _account.accountType = "Player" // is there a way to get this enum here?


    _account.timelockedBalance = ZERO
    _account.unlockTimestamp = ZERO
    _account.cumulativeWinnings = ZERO

    _account.save()
  }

  return _account as Account
}


export function loadOrCreateDripTokenPlayer(
  comptroller: Address,
  dripToken: Address,
  player: Address
): DripTokenPlayer {
  const _playerId = dripTokenPlayerId(comptroller.toHex(), dripToken.toHex(), player.toHex())
  let _player = DripTokenPlayer.load(_playerId)

  if (!_player) {
    _player = new DripTokenPlayer(_playerId)

    log.warning('DripTokenPlayer {}', [player.toHex()])
    _player.dripToken = dripToken
    _player.comptroller = comptroller.toHex()
    _player.address = player
    _player.balance = BigInt.fromI32(0)
    _player.save()
  }

  return _player as DripTokenPlayer
}


export function loadOrCreateBalanceDripPlayer(
  balanceDripId: string,
  player: Address,
): BalanceDripPlayer {
  const _playerId = balanceDripPlayerId(balanceDripId, player.toHex())
  let _player = BalanceDripPlayer.load(_playerId)

  if (!_player) {
    _player = new BalanceDripPlayer(_playerId)

    log.warning('BalanceDripPlayer {}', [player.toHex()])
    _player.balanceDrip = balanceDripId
    _player.address = player
    _player.save()
  }

  return _player as BalanceDripPlayer
}


export function loadOrCreateVolumeDripPlayer(
  volumeDripId: string,
  player: Address,
): VolumeDripPlayer {
  const _playerId = volumeDripPlayerId(volumeDripId, player.toHex())
  let _player = VolumeDripPlayer.load(_playerId)

  if (!_player) {
    _player = new VolumeDripPlayer(_playerId)

    log.warning('VolumeDripPlayer {}', [player.toHex()])
    _player.volumeDrip = volumeDripId
    _player.address = player
    _player.periodIndex = BigInt.fromI32(0)
    _player.balance = BigInt.fromI32(0)
    _player.save()
  }

  return _player as VolumeDripPlayer
}