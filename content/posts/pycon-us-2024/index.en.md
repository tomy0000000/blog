---
title: "PyCon US 2024"
date: 2024-05-27T15:13:03-07:00
description: "My First PyCon in US 🫶🏻"
categories: ["🤖 Development"]
tags: ["🎪 PyCon", "🐍 Python"]
feature: "tomy-at-pycon-us.jpg"
featureAlt: "Tomy at PyCon US 2024"
---

After PyCon TW and DE, I'm finally landing at the largest PyCon on Earth: PyCon US 🇺🇸.

What's amazing is that this year, PyCon US is taking place right here in Pittsburgh, the steel city where I'm currently pursuing my Master's degree. This means I can attend the event without the hassle of airfare and hotel expenses.

So let's get straight into my findings 🚀

## 🐍 Python 3.13

is coming later this year!

### 🔖 Types

Improving type annotation syntax has been the single most important change, a trend that has been ongoing for at least 10 years in Python. Its impact is so significant that there is even a dedicated Typing summit as well as a typing committee to address this challenge.

4 PEPs have been accepted and implemented this year. At first glance, they may seem hard to understand, but when used wisely, they will help your editors and linters better understand what you're trying to achieve, thus giving you better auto-complete suggestions.

### 🔓 The Removal of GIL

GIL is one of (if not most) the critical components to prevent race conditions in Python by only allowing one thread to execute simultaneously, which is beneficial for most cases. However, for tasks that require intensive computation, which could've been partitioned and parallelized execution, this became a significant drawback as GIL only facilitates one core when there are a lot more just sitting around doing nothing. However, GIL has existed in Python since day one, and many core-level components also depend on it, which makes the removal process harder.

In Python 3.12, the [sub-interpreter](https://docs.python.org/3.12/whatsnew/3.12.html#pep-684-a-per-interpreter-gil) is introduced. This allows tasks to be divided into multiple chunks and executed in multiple sub-interpreters.

However, this is just a timely step as it does not solve the fundamental issue. What we want is the complete removal of GIL, the so-called "[Free-threaded](https://docs.python.org/3.13/whatsnew/3.13.html#free-threaded-cpython)," to unleash Python's full potential.

Last year, a group of Meta engineers had a [discussion](https://discuss.python.org/t/a-fast-free-threading-python/27903/99) about how to implement such a huge change, and they gained some support from the company to work on this issue at full pace.

So, a roadmap is planned. [PEP 703](https://peps.python.org/pep-0703/) was drafted, and the [first PR](https://github.com/python/cpython/pull/116338) has been merged into the main branch. Python 3.13 will be the first official Python version you can execute without GIL.

However, there are constraints, like a lot. So be sure to check out [this talk](https://gist.github.com/tonybaloney/24d545ed855a3c90f844209152835f07) before you start walking on the wire.

### 📅 CalVer?

Hugo, the release manager of Python 3.14 and 3.15, opened the discussion during the language summit about changing Python's versioning to [CalVer](https://calver.org/).

This means if this proposal is accepted, instead of 3.14 and 3.15, we will have 3.25 and 3.26.

Python has traditionally been considered versioning with [SemVar](https://semver.org/), but SemVar wasn't even a thing when Python was created. It was a time when Python did not have stable release cycles, so versioning just sort of conforms to the idea of SemVar.

However, as Python now has a one-year release cycle, switching to CalVar can have some added benefits. If interested, check out [Hugo's talk](https://hugovk.github.io/python-calver/).

## 🌅 New packages on the horizon

Although these packages have been around for a while, they're once again making headlines at the conference this year.

- [PyScript](https://github.com/pyscript/pyscript): As WebAssembly becomes more popular and mature, more people start using PyScript to embed Python directly into websites. For pure Python packages, they can now embed playgrounds or sandboxes into their documentation, just like most JavaScript modules.
- [PyO3](https://github.com/PyO3/pyo3): Rust is gaining popularity, and so will PyO3. By creating an interface wrapper around Rust using PyO3, existing Python applications or packages can intuitively exploit Rust performance.
- [DuckDB](https://github.com/duckdb/duckdb): SQLite aims to be a small, self-contained variant in place of RDBMS like MySQL and Postgres. DuckDB seeks to be the same for analytical data. Although only a little user has put them into production usage, the initial developer feedback is quite positive. They've also announced that they will roll out managed services lately and claim that it will be more than just another instance running on the cloud. Instead, the client will work with the cloud instance to execute some minor computation locally while leaving data-intensive queries to the cloud instance to achieve a high overall performance. That sounds interesting to me, and it may be worth paying attention to check it out in the near future.

## 🍭 Some other thoughts

These are some other random thoughts that I find interesting to jot them down.

### 🥗 The foods

As I've mentioned, I've been to PyCon DE in 2021. A common thing about both conferences is that I can hardly understand their food, even when looking at the signs. However, in terms of the flavor, oh man, that's a whole lot different. I'm unsure who is to blame for such a tasteless lunch. It could be PSF did not put sufficient funds or effort into the catering (which is understandable, and I'm not here to judge), or maybe Americans were just so used to having these disgusting nutrition compounds, so they stopped trying anyhow.

I genuinely wish they could prove me wrong next year.

### 👖 Why is there no pants

Strolling around sponsored booths, I got lots of SWAGs, T-shirts, hats, and even socks. This got me thinking: Why is it that no tech company is giving out SWAG pants? Is it because programmers don't wear pants? because they all work from home?

## 🌯 That’s a wrap

PyCon US will still be hosted in Pittsburgh. Although I should have graduated and moved on by then, the date is close to my graduation commencement, so I suppose it will be a grand return for two events in a go then.

See you next year!

---

## 🎀 Ackownledgement

A special thank goes to CMU's Office of Graduate and Postdoctoral Affairs for funding my admission ticket through the Professional Engagement Funding.
